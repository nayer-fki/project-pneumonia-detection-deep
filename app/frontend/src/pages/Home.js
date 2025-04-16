import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div>
          <h1>Pneumonia Detection</h1>
          <p>Empowering healthcare with AI-driven chest X-ray analysis for accurate and rapid pneumonia detection.</p>
        </div>
      </header>
      <main className="main">
        <section className="video-section">
          <video autoPlay loop muted playsInline>
            <source src="/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
        <section className="section">
          <h2>About the Project</h2>
          <p>
            Our advanced Convolutional Neural Network (CNN) model analyzes chest X-ray images to detect pneumonia with high precision.
            Trained on the Kaggle Chest X-Ray dataset, our best model—an augmented CNN—achieves an accuracy of 88.78%, supporting healthcare professionals in early diagnosis and treatment.
          </p>
        </section>
        <section className="section">
          <h2>Prediction Examples</h2>
          <div className="prediction-examples-grid">
            <div className="example-card">
              <h3>Normal X-ray</h3>
              <img src="/examples/normal.jpg" alt="Normal X-ray" />
              <p>Prediction: Normal (Confidence: 92.45%)</p>
            </div>
            <div className="example-card">
              <h3>Pneumonia X-ray</h3>
              <img src="/examples/pneumonia.jpg" alt="Pneumonia X-ray" />
              <p>Prediction: Pneumonia (Confidence: 87.12%)</p>
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Explore More</h2>
          <div className="options-grid">
            <Link to="/learn-more">
              <div className="option-card">
                <h3>Learn More</h3>
                <p>Discover the technology behind our model and its impact on healthcare.</p>
              </div>
            </Link>
            <Link to="/view-dataset">
              <div className="option-card">
                <h3>View Dataset</h3>
                <p>Explore the Kaggle Chest X-Ray dataset used to train our model.</p>
              </div>
            </Link>
            <Link to="/model-details">
              <div className="option-card">
                <h3>Model Details</h3>
                <p>Learn about the architecture and performance metrics of our CNN.</p>
              </div>
            </Link>
          </div>
        </section>
        <section className="button-section">
          <Link to="/predict">
            <button className="predict-button">Try the Prediction Tool</button>
          </Link>
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

export default Home;