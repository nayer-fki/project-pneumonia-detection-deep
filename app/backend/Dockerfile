FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Create models directory and copy the model file
RUN mkdir -p /app/models
COPY cnn_augmented_model.h5 /app/models/cnn_augmented_model.h5
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]