from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from PIL import Image
import numpy as np
import io
import os
import logging
from pathlib import Path
import uvicorn

# Ensure the log directory exists and set up the log file path
BASE_DIR = Path(__file__).parent  # Directory of main.py (app/backend)
LOG_DIR = BASE_DIR  # Log file will be placed directly in app/backend
LOG_FILE = LOG_DIR / "pneumonia_detection.log"

# Create the log directory if it doesn't exist
LOG_DIR.mkdir(parents=True, exist_ok=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Disable oneDNN optimizations to prevent OpenMP conflict
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
tf.config.threading.set_inter_op_parallelism_threads(1)
tf.config.threading.set_intra_op_parallelism_threads(1)

# Initialize FastAPI app with metadata
app = FastAPI(
    title="Pneumonia Detection API",
    description="API for detecting pneumonia from chest X-ray images using a pre-trained CNN model.",
    version="1.0.0"
)

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define response model using Pydantic
class PredictionResponse(BaseModel):
    label: str
    confidence: float

# Define supported image formats and maximum file size (5MB)
SUPPORTED_IMAGE_FORMATS = {"image/jpeg", "image/png"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB in bytes

# Define model path for Docker/containerized environment
MODEL_PATH = Path('/app/models/cnn_augmented_model.h5')

# Check if model file exists
if not MODEL_PATH.exists():
    logger.error(f"Model file not found at {MODEL_PATH}")
    raise RuntimeError(f"Model file not found at {MODEL_PATH}")

logger.info(f"Using model path: {MODEL_PATH}")

# Load the model
try:
    logger.info("Starting model loading...")
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}", exc_info=True)
    raise RuntimeError(f"Failed to load model: {str(e)}")

@app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint to verify the API is running and the model is loaded.
    """
    try:
        # Test model availability with a dummy input
        dummy_input = np.zeros((1, 224, 224, 3))
        model.predict(dummy_input, verbose=0)
        logger.info("Health check passed: Model is available")
        return {"status": "healthy", "model": "loaded"}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """
    Predict whether a chest X-ray image indicates pneumonia.

    Parameters:
    - file: An uploaded image file (expected to be a chest X-ray in PNG/JPEG format)

    Returns:
    - label: Predicted class ("Normal" or "Pneumonia")
    - confidence: Confidence score for the prediction (0.0 to 1.0)

    Raises:
    - HTTPException: If the file is invalid or prediction fails
    """
    # Validate file type
    if not file.content_type:
        logger.error("No file content type provided")
        raise HTTPException(status_code=400, detail="File content type is missing")

    if file.content_type not in SUPPORTED_IMAGE_FORMATS:
        logger.error(f"Unsupported file type: {file.content_type}")
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}. Only JPEG and PNG are allowed")

    # Validate file size
    contents = await file.read()
    file_size = len(contents)
    if file_size > MAX_FILE_SIZE:
        logger.error(f"File too large: {file_size} bytes (max: {MAX_FILE_SIZE} bytes)")
        raise HTTPException(status_code=400, detail=f"File too large: {file_size} bytes. Maximum allowed size is {MAX_FILE_SIZE} bytes")

    if file_size == 0:
        logger.error("Empty file uploaded")
        raise HTTPException(status_code=400, detail="Empty file uploaded")

    try:
        logger.info(f"Received file: {file.filename}, Size: {file_size} bytes, Type: {file.content_type}")
        # Read and preprocess the image
        img = Image.open(io.BytesIO(contents)).resize((224, 224)).convert('RGB')
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Make prediction
        prediction = model.predict(img_array, verbose=0)[0][0]
        label = "Pneumonia" if prediction > 0.5 else "Normal"
        confidence = prediction if label == "Pneumonia" else 1 - prediction

        logger.info(f"Prediction: {label}, Confidence: {confidence:.4f}")
        return PredictionResponse(label=label, confidence=float(confidence))

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# Run the server if the script is executed directly
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )