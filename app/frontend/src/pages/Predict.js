import React, { useState } from 'react';
import axios from 'axios';

function Predict() {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setSelectedImage(URL.createObjectURL(uploadedFile));
    setPrediction(null);
  };

  const handleExampleSelect = (example) => {
    setFile(null);
    setSelectedImage(`/examples/${example}.jpg`);
    setPrediction(null);
  };

  const handlePredict = async () => {
    if (!file && !selectedImage) {
      alert('Please upload an image or select an example image.');
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('file', blob, selectedImage.split('/').pop());
      }

      const result = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(result.data);
    } catch (error) {
      console.error('Error predicting:', error);
      alert('Error predicting. Please ensure the image is a valid JPEG or PNG and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-container">
      <main className="main">
        <section className="section">
          <h2>Upload Your Chest X-ray</h2>
          <p>
            Upload a chest X-ray image (JPEG or PNG) to get an instant prediction on whether it indicates pneumonia. Ensure the image is clear and properly formatted for best results.
          </p>
          <div className="predict-form">
            <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} />
            <button onClick={handlePredict} disabled={loading || (!file && !selectedImage)}>
              {loading ? 'Predicting...' : 'Predict Now'}
            </button>
          </div>
        </section>
        <section className="section">
          <h2>Or Try an Example Image</h2>
          <p>
            Not ready to upload your own image? Test our model with these example chest X-rays to see how it performs.
          </p>
          <div className="example-grid">
            <div className="example-card" onClick={() => handleExampleSelect('normal')}>
              <h3>Normal X-ray</h3>
              <img src="/examples/normal.jpg" alt="Normal X-ray" />
            </div>
            <div className="example-card" onClick={() => handleExampleSelect('pneumonia')}>
              <h3>Pneumonia X-ray</h3>
              <img src="/examples/pneumonia.jpg" alt="Pneumonia X-ray" />
            </div>
          </div>
        </section>
        {selectedImage && (
          <section className="section selected-image">
            <h2>Selected Image Preview</h2>
            <img src={selectedImage} alt="Selected X-ray" />
          </section>
        )}
        {prediction && (
          <section className="result-section">
            <div className="result-card">
              <h3>Prediction Result: {prediction.label}</h3>
              <p>Confidence: {(prediction.confidence * 100).toFixed(2)}%</p>
              {prediction.label === "Pneumonia" && (
                <p className="disease-comment">
                  
                      Disease detected: Pneumonia. Please consult a doctor for a thorough diagnosis.
                </p>
              )}
            </div>
          </section>
        )}
      </main>
      <footer className="footer">
        <div>
          <p>© 2025 Pneumonia Detection Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Predict;