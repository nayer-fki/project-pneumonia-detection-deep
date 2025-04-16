import React from 'react';
import { Link } from 'react-router-dom';

function LearnMore() {
  return (
    <div className="info-container">
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
      <header className="header">
        <div>
          <h1>Learn More</h1>
          <p>Discover the technology behind our pneumonia detection model and its transformative impact on healthcare.</p>
        </div>
      </header>
      <main className="main">
        <section className="section">
          <h2>Our Approach</h2>
          <p>
            We developed a state-of-the-art Convolutional Neural Network (CNN) to analyze chest X-ray images and detect pneumonia with high accuracy.
            The model was trained on the Kaggle Chest X-Ray dataset, consisting of thousands of labeled images, enabling it to distinguish between normal and pneumonia-affected lungs effectively.
          </p>
          <p>
            By leveraging deep learning, our solution facilitates faster and more accurate diagnoses, empowering healthcare professionals to make informed decisions.
            This technology is especially valuable in regions with limited access to radiologists, improving patient outcomes through early detection.
          </p>
        </section>
        <section className="section">
          <h2>Impact on Healthcare</h2>
          <p>
            Our model offers several key benefits for the healthcare industry:<br />
            - **Early Detection**: Identifies pneumonia at an early stage, improving treatment success rates.<br />
            - **Efficiency**: Reduces the workload of radiologists by providing quick preliminary assessments.<br />
            - **Accessibility**: Enables diagnostic support in remote and underserved areas with limited medical resources.<br />
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

export default LearnMore;