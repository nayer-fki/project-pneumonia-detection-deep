import React from 'react';
import { Link } from 'react-router-dom';

function ViewDataset() {
  return (
    <div className="info-container">
      <Link to="/">
        <button className="back-button">Back to Home</button>
      </Link>
      <header className="header">
        <div>
          <h1>View Dataset</h1>
          <p>Explore the dataset that powers our pneumonia detection model.</p>
        </div>
      </header>
      <main className="main">
        <section className="section">
          <h2>Kaggle Chest X-Ray Dataset</h2>
          <p>
            Our model was trained on the Chest X-Ray Images (Pneumonia) dataset from Kaggle, a comprehensive collection of 5,856 chest X-ray images.
            The dataset is divided into three subsets for training, validation, and testing:
          </p>
          <p>
            - **Training Set**: 5,216 images (1,341 normal, 3,875 pneumonia).<br />
            - **Validation Set**: 16 images (8 normal, 8 pneumonia).<br />
            - **Test Set**: 624 images (234 normal, 390 pneumonia).<br />
          </p>
        </section>
        <section className="section">
          <h2>Access the Dataset</h2>
          <p>
            Interested in exploring the dataset yourself? You can download it directly from Kaggle to examine the images and labels used in our training process.
            Visit the dataset page here: <a href="https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia" target="_blank" rel="noopener noreferrer">Kaggle Chest X-Ray Dataset</a>.
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

export default ViewDataset;