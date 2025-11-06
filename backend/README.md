# SkinSync Backend - FastAPI ML Service

## Overview
FastAPI backend implementing 6 core ML algorithms for personalized skincare recommendations.

## ML Algorithms Implemented
1. **Linear Regression** - Predict skin hydration levels
2. **Naive Bayes** - Classify skin type (Oily, Dry, Combination, Sensitive)
3. **K-Nearest Neighbors (KNN)** - Recommend similar products
4. **Support Vector Machine (SVM)** - Detect potential allergens
5. **Decision Tree** - Product suitability classification
6. **Artificial Neural Network (ANN)** - Advanced skin condition prediction

## Installation

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Generate synthetic data and train models:
```bash
python generate_data.py
python train_models.py
```

5. Run the server:
```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

- `GET /` - Health check
- `POST /predict/linear-regression` - Predict hydration level
- `POST /predict/naive-bayes` - Classify skin type
- `POST /predict/knn` - Get product recommendations
- `POST /predict/svm` - Detect allergen risk
- `POST /predict/decision-tree` - Check product suitability
- `POST /predict/ann` - Predict skin condition
- `GET /models/info` - Get information about all models

## Deployment
Deploy to Render.com for production use.
