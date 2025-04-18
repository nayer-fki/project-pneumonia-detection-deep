# project-pneumonia-detection-deep

This project uses a Convolutional Neural Network (CNN) to detect pneumonia from chest X-ray images. It includes a FastAPI backend for predictions and a React frontend for user interaction.

## Project Structure
- `app/backend`: FastAPI backend with the prediction API.
- `app/frontend`: React frontend for the web interface.
- `data`: Contains the Kaggle Chest X-Ray dataset (not included in this repository due to size).
- `models`: Contains the trained model file (not included in this repository due to size).

## Prerequisites
- Python 3.8+
- Node.js 16+
- Docker
- Google Cloud SDK (for deployment)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/nayer-fki/project-pneumonia-detection-deep.git
cd project-pneumonia-detection-deep