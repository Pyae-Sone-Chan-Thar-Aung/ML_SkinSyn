# Add these badges to the top of your README.md

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15+-orange.svg)](https://www.tensorflow.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.3+-yellow.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

## 🎯 Performance Metrics

| Algorithm | Metric | Score | Use Case |
|-----------|--------|-------|----------|
| **SVM** | Accuracy | **87.5%** | Allergen Risk Detection |
| **KNN** | Accuracy | **80.3%** | Product Recommendations |
| **Random Forest** | Accuracy | **76.8%** | Product Suitability |
| **Naive Bayes** | Accuracy | **61.0%** | Skin Type Classification |
| **ANN** | MAE | **1.27** | Satisfaction Prediction |
| **Linear Regression** | R² | **0.19** | Hydration Prediction |

## 📊 Dataset Statistics

- **2,000** User Profiles
- **500** Skincare Products
- **3,000** User-Product Interactions
- **12** Features (Age, Oil Production, Sensitivity, etc.)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Pyae-Sone-Chan-Thar-Aung/ML_SkinSyn.git
cd ML_SkinSyn

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python generate_data.py
python train_models.py
uvicorn main:app --reload

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000 🎉

## 📸 Screenshots

### Try Now Page
![Try Now Interface](docs/screenshots/try-now.png)

### API Documentation
![Swagger UI](docs/screenshots/api-docs.png)

### Training Metrics
![Metrics Dashboard](docs/screenshots/metrics.png)

## 🏆 Project Highlights

- ✅ 6 ML Algorithms (Linear Regression, Naive Bayes, KNN, SVM, Random Forest, ANN)
- ✅ Hyperparameter Tuning with GridSearchCV
- ✅ Cross-Validation for Robust Evaluation
- ✅ Interactive Web Interface
- ✅ RESTful API with FastAPI
- ✅ Real-time Predictions
- ✅ Training Metrics Tracking
- ✅ Rubric Self-Assessment Tools

## 📝 API Endpoints

- `GET /` - Health check
- `GET /models/info` - Model information
- `GET /models/metrics` - Training metrics
- `GET /rubric` - Evaluation rubric
- `POST /predict/linear-regression` - Hydration prediction
- `POST /predict/naive-bayes` - Skin type classification
- `POST /predict/knn` - Product recommendation
- `POST /predict/svm` - Allergen risk detection
- `POST /predict/decision-tree` - Product suitability
- `POST /predict/ann` - Satisfaction prediction

## 👥 Team

[Add your team members here]

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Machine Learning Final Project
- Course Instructor: [Name]
- Dataset: Synthetic skincare data
