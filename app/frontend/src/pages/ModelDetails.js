import React from 'react';
import { Link } from 'react-router-dom';

function ModelDetails() {
  return (
    <div className="info-container">
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
      <header className="header">
        <div>
          <h1>Model Details</h1>
          <p>Understand the technical architecture and performance of our pneumonia detection model.</p>
        </div>
      </header>
      <main className="main">
        <section className="section">
          <h2>Model Architecture</h2>
          <p>
            Our best-performing model is an augmented Convolutional Neural Network (CNN) designed for binary classification of chest X-ray images. The architecture includes:<br />
            - **Input Layer**: Accepts 224x224 RGB images.<br />
            - **Convolutional Layers**: Multiple Conv2D layers with ReLU activation and MaxPooling for feature extraction.<br />
            - **Dropout Layers**: Applied to reduce overfitting during training.<br />
            - **Fully Connected Layers**: Dense layers with ReLU and sigmoid activation for binary classification (Normal vs. Pneumonia).<br />
          </p>
        </section>
        <section className="section">
          <h2>Performance Metrics</h2>
          <p>
            The augmented CNN was evaluated on the test set, achieving the following results:<br />
            - **Accuracy**: 88.78%<br />
            - **Precision**: 89.5% (Pneumonia class)<br />
            - **Recall**: 91.2% (Pneumonia class)<br />
            - **F1-Score**: 90.3% (Pneumonia class)<br />
          </p>
        </section>
      </main>
      <footer className="footer">
        <div>
          <p>© 2025 Pneumonia Detection Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ModelDetails;