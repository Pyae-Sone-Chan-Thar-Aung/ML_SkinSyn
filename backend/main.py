"""
SkinSync FastAPI Backend
Main application with ML model endpoints
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import joblib
import numpy as np
import tensorflow as tf
from tensorflow import keras
import os
import json
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="SkinSync ML API",
    description="Machine Learning API for personalized skincare recommendations",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://skinsync.vercel.app",
        "https://*.vercel.app"  # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all models at startup
models = {}

def load_models():
    """Load all trained models"""
    try:
        # Linear Regression
        models['linear_regression'] = joblib.load('models/linear_regression.pkl')
        models['linear_regression_scaler'] = joblib.load('models/linear_regression_scaler.pkl')
        models['linear_regression_features'] = joblib.load('models/linear_regression_features.pkl')
        
        # Naive Bayes
        models['naive_bayes'] = joblib.load('models/naive_bayes.pkl')
        models['naive_bayes_scaler'] = joblib.load('models/naive_bayes_scaler.pkl')
        models['naive_bayes_encoder'] = joblib.load('models/naive_bayes_encoder.pkl')
        models['naive_bayes_features'] = joblib.load('models/naive_bayes_features.pkl')
        
        # KNN
        models['knn'] = joblib.load('models/knn.pkl')
        models['knn_scaler'] = joblib.load('models/knn_scaler.pkl')
        models['knn_features'] = joblib.load('models/knn_features.pkl')
        
        # SVM
        models['svm'] = joblib.load('models/svm.pkl')
        models['svm_scaler'] = joblib.load('models/svm_scaler.pkl')
        models['svm_features'] = joblib.load('models/svm_features.pkl')
        
        # Decision Tree
        models['decision_tree'] = joblib.load('models/decision_tree.pkl')
        models['decision_tree_features'] = joblib.load('models/decision_tree_features.pkl')
        
        # ANN
        models['ann'] = keras.models.load_model('models/ann_model.keras')
        models['ann_scaler'] = joblib.load('models/ann_scaler.pkl')
        models['ann_features'] = joblib.load('models/ann_features.pkl')
        
        print("✓ All models loaded successfully")
    except Exception as e:
        print(f"Error loading models: {e}")
        print("Please run 'python generate_data.py' and 'python train_models.py' first")

def ensure_model_keys(required_keys: list):
    """Ensure given model keys exist; attempt reload if missing."""
    missing = [k for k in required_keys if k not in models]
    if missing:
        load_models()
        missing = [k for k in required_keys if k not in models]
        if missing:
            raise HTTPException(status_code=503, detail=f"Models not loaded: {', '.join(missing)}. Train and try /models/reload.")

# Pydantic models for request/response
class UserProfile(BaseModel):
    age: int = Field(..., ge=18, le=100)
    oil_production: int = Field(..., ge=1, le=10)
    sensitivity_level: int = Field(..., ge=1, le=10)
    pore_size: int = Field(..., ge=1, le=10)
    hydration_level: Optional[int] = Field(5, ge=1, le=10)
    wrinkle_score: Optional[int] = Field(5, ge=1, le=10)

class ProductFeatures(BaseModel):
    has_fragrance: int = Field(..., ge=0, le=1)
    has_alcohol: int = Field(..., ge=0, le=1)
    is_hypoallergenic: int = Field(..., ge=0, le=1)

class SuitabilityInput(BaseModel):
    age: int
    sensitivity_level: int
    oil_production: int
    hydration_level: int
    suitable_for_oily: int
    suitable_for_dry: int
    suitable_for_sensitive: int
    has_fragrance: int
    has_alcohol: int

class SatisfactionInput(BaseModel):
    age: int
    oil_production: int
    hydration_level: int
    sensitivity_level: int
    pore_size: int
    wrinkle_score: int
    suitable_for_oily: int
    suitable_for_dry: int
    suitable_for_sensitive: int
    has_fragrance: int
    has_alcohol: int
    is_hypoallergenic: int

# API Endpoints
@app.on_event("startup")
async def startup_event():
    """Load models on startup"""
    load_models()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "SkinSync ML API is running",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/models/metrics")
async def get_training_metrics():
    """Return training metrics saved during model training."""
    metrics_path = Path('models') / 'metrics.json'
    if not metrics_path.exists():
        raise HTTPException(status_code=404, detail="metrics.json not found. Run train_models.py first.")
    try:
        with open(metrics_path, 'r') as f:
            metrics = json.load(f)
        return {"metrics": metrics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models/reload")
async def reload_models():
    """Force reload models from disk (use after training)."""
    try:
        load_models()
        return {"status": "ok", "loaded_keys": list(models.keys())}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/rubric")
async def get_rubric():
    """Return rubric-aligned criteria to guide evaluation and presentation."""
    rubric = {
        "categories": [
            {
                "name": "Website Aesthetics and Navigation",
                "max_points": 10,
                "criteria": [
                    "Professional, visually appealing design",
                    "Intuitive navigation and responsiveness",
                    "Consistent branding reflecting SkinSync concepts"
                ],
                "frontend_paths": ["/", "/about", "/algorithms", "/try-now"]
            },
            {
                "name": "Clarity and Accuracy of Algorithm Explanations",
                "max_points": 10,
                "criteria": [
                    "Clear non-technical summaries",
                    "Business context and value",
                    "Accurate technical descriptions with inputs/outputs"
                ],
                "frontend_paths": ["/algorithms"],
            },
            {
                "name": "Relevance and Justification of Data and Algorithms",
                "max_points": 10,
                "criteria": [
                    "Alignment with skincare business goals",
                    "Realistic data modeling",
                    "Justification for algorithm choices"
                ],
                "backend_refs": ["/models/info", "/models/metrics"]
            },
            {
                "name": "Depth of Algorithm Application and Results Interpretation",
                "max_points": 10,
                "criteria": [
                    "Implementation of 6 algorithms",
                    "Performance metrics and interpretation",
                    "Business-impact recommendations"
                ],
                "frontend_paths": ["/try-now"],
                "backend_refs": ["/predict/*"]
            },
            {
                "name": "Individual Presentation Quality",
                "max_points": 10,
                "criteria": [
                    "Well-documented codebase",
                    "Clear README and setup",
                    "Professional demo readiness"
                ],
                "docs": ["README.md", "SETUP_GUIDE.md"]
            }
        ]
    }
    return rubric

@app.get("/models/info")
async def get_models_info():
    """Get information about all available models"""
    return {
        "models": [
            {
                "name": "Linear Regression",
                "endpoint": "/predict/linear-regression",
                "purpose": "Predict skin hydration levels based on user characteristics",
                "input_features": ["age", "oil_production", "sensitivity_level", "pore_size"],
                "output": "Predicted hydration level (1-10 scale)"
            },
            {
                "name": "Naive Bayes",
                "endpoint": "/predict/naive-bayes",
                "purpose": "Classify skin type (Oily, Dry, Combination, Sensitive, Normal)",
                "input_features": ["age", "oil_production", "hydration_level", "sensitivity_level", "pore_size"],
                "output": "Predicted skin type and probability"
            },
            {
                "name": "K-Nearest Neighbors (KNN)",
                "endpoint": "/predict/knn",
                "purpose": "Recommend products based on similar user profiles",
                "input_features": ["age", "oil_production", "hydration_level", "sensitivity_level", "pore_size", "wrinkle_score"],
                "output": "Product recommendation (Yes/No) and confidence"
            },
            {
                "name": "Support Vector Machine (SVM)",
                "endpoint": "/predict/svm",
                "purpose": "Detect potential allergen risks and reactions",
                "input_features": ["sensitivity_level", "has_fragrance", "has_alcohol", "is_hypoallergenic"],
                "output": "Allergen risk assessment and probability"
            },
            {
                "name": "Decision Tree",
                "endpoint": "/predict/decision-tree",
                "purpose": "Classify product suitability for user",
                "input_features": ["age", "sensitivity_level", "oil_production", "hydration_level", "suitable_for_oily", "suitable_for_dry", "suitable_for_sensitive", "has_fragrance", "has_alcohol"],
                "output": "Suitability classification and confidence"
            },
            {
                "name": "Artificial Neural Network (ANN)",
                "endpoint": "/predict/ann",
                "purpose": "Predict product satisfaction score using deep learning",
                "input_features": ["age", "oil_production", "hydration_level", "sensitivity_level", "pore_size", "wrinkle_score", "suitable_for_oily", "suitable_for_dry", "suitable_for_sensitive", "has_fragrance", "has_alcohol", "is_hypoallergenic"],
                "output": "Predicted satisfaction score (1-10 scale)"
            }
        ]
    }

@app.post("/predict/linear-regression")
async def predict_hydration(profile: UserProfile):
    """
    Linear Regression: Predict skin hydration level
    Business Context: Helps users understand their skin's moisture needs
    """
    try:
        ensure_model_keys(['linear_regression', 'linear_regression_scaler'])
        # Prepare features
        features = [
            profile.age,
            profile.oil_production,
            profile.sensitivity_level,
            profile.pore_size
        ]
        
        # Scale and predict
        features_scaled = models['linear_regression_scaler'].transform([features])
        prediction = models['linear_regression'].predict(features_scaled)[0]
        
        # Interpret result
        if prediction < 4:
            interpretation = "Low hydration - Your skin needs intensive moisturizing products"
            recommendation = "Look for products with Hyaluronic Acid, Glycerin, and Ceramides"
        elif prediction < 7:
            interpretation = "Moderate hydration - Your skin has balanced moisture levels"
            recommendation = "Maintain with lightweight moisturizers and hydrating serums"
        else:
            interpretation = "High hydration - Your skin is well-moisturized"
            recommendation = "Use oil-control products and lighter formulations"
        
        return {
            "algorithm": "Linear Regression",
            "predicted_hydration_level": round(float(prediction), 2),
            "interpretation": interpretation,
            "recommendation": recommendation,
            "input_features": {
                "age": profile.age,
                "oil_production": profile.oil_production,
                "sensitivity_level": profile.sensitivity_level,
                "pore_size": profile.pore_size
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/naive-bayes")
async def predict_skin_type(profile: UserProfile):
    """
    Naive Bayes: Classify skin type
    Business Context: Helps users identify their skin type for targeted product selection
    """
    try:
        # Prepare features
        features = [
            profile.age,
            profile.oil_production,
            profile.hydration_level,
            profile.sensitivity_level,
            profile.pore_size
        ]
        
        # Scale and predict
        features_scaled = models['naive_bayes_scaler'].transform([features])
        prediction = models['naive_bayes'].predict(features_scaled)[0]
        probabilities = models['naive_bayes'].predict_proba(features_scaled)[0]
        
        # Decode prediction
        skin_type = models['naive_bayes_encoder'].inverse_transform([prediction])[0]
        confidence = float(max(probabilities)) * 100
        
        # Recommendations based on skin type
        recommendations = {
            "Oily": "Use oil-free, mattifying products with Salicylic Acid and Niacinamide",
            "Dry": "Focus on rich moisturizers with Hyaluronic Acid, Ceramides, and Squalane",
            "Combination": "Use targeted treatments - lightweight for T-zone, richer for dry areas",
            "Sensitive": "Choose fragrance-free, hypoallergenic products with soothing ingredients",
            "Normal": "Maintain balance with gentle cleansers and lightweight moisturizers"
        }
        
        return {
            "algorithm": "Naive Bayes",
            "predicted_skin_type": skin_type,
            "confidence": round(confidence, 2),
            "all_probabilities": {
                skin_type: round(float(prob) * 100, 2) 
                for skin_type, prob in zip(models['naive_bayes_encoder'].classes_, probabilities)
            },
            "recommendation": recommendations[skin_type],
            "input_features": {
                "age": profile.age,
                "oil_production": profile.oil_production,
                "hydration_level": profile.hydration_level,
                "sensitivity_level": profile.sensitivity_level,
                "pore_size": profile.pore_size
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/knn")
async def recommend_product(profile: UserProfile):
    """
    KNN: Product recommendation based on similar users
    Business Context: Recommends products that similar users have liked
    """
    try:
        # Prepare features
        features = [
            profile.age,
            profile.oil_production,
            profile.hydration_level,
            profile.sensitivity_level,
            profile.pore_size,
            profile.wrinkle_score
        ]
        
        # Scale and predict
        features_scaled = models['knn_scaler'].transform([features])
        prediction = models['knn'].predict(features_scaled)[0]
        probabilities = models['knn'].predict_proba(features_scaled)[0]
        
        confidence = float(max(probabilities)) * 100
        would_recommend = bool(prediction)
        
        return {
            "algorithm": "K-Nearest Neighbors (KNN)",
            "recommendation": "Recommended" if would_recommend else "Not Recommended",
            "would_recommend": would_recommend,
            "confidence": round(confidence, 2),
            "explanation": "Based on similar users' experiences and satisfaction scores",
            "similar_users_liked": would_recommend,
            "input_features": {
                "age": profile.age,
                "oil_production": profile.oil_production,
                "hydration_level": profile.hydration_level,
                "sensitivity_level": profile.sensitivity_level,
                "pore_size": profile.pore_size,
                "wrinkle_score": profile.wrinkle_score
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/svm")
async def detect_allergen_risk(data: dict):
    """
    SVM: Allergen risk detection
    Business Context: Prevents allergic reactions by identifying risky products
    """
    try:
        # Prepare features
        features = [
            data['sensitivity_level'],
            data['has_fragrance'],
            data['has_alcohol'],
            data['is_hypoallergenic']
        ]
        
        # Scale and predict
        features_scaled = models['svm_scaler'].transform([features])
        prediction = models['svm'].predict(features_scaled)[0]
        probabilities = models['svm'].predict_proba(features_scaled)[0]
        
        risk_probability = float(probabilities[1]) * 100  # Probability of reaction
        has_risk = bool(prediction)
        
        if has_risk:
            risk_level = "High Risk"
            warning = "⚠️ This product may cause allergic reactions based on your sensitivity level"
        else:
            risk_level = "Low Risk"
            warning = "✓ This product is likely safe for your skin type"
        
        return {
            "algorithm": "Support Vector Machine (SVM)",
            "allergen_risk": risk_level,
            "has_risk": has_risk,
            "risk_probability": round(risk_probability, 2),
            "warning": warning,
            "advice": "Patch test recommended" if has_risk else "Product appears safe for your skin",
            "input_features": {
                "sensitivity_level": data['sensitivity_level'],
                "has_fragrance": bool(data['has_fragrance']),
                "has_alcohol": bool(data['has_alcohol']),
                "is_hypoallergenic": bool(data['is_hypoallergenic'])
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/decision-tree")
async def classify_suitability(data: SuitabilityInput):
    """
    Decision Tree: Product suitability classification
    Business Context: Determines if a product is suitable for user's profile
    """
    try:
        # Prepare features
        features = [
            data.age,
            data.sensitivity_level,
            data.oil_production,
            data.hydration_level,
            data.suitable_for_oily,
            data.suitable_for_dry,
            data.suitable_for_sensitive,
            data.has_fragrance,
            data.has_alcohol
        ]
        
        # Predict (no scaling needed for decision tree)
        prediction = models['decision_tree'].predict([features])[0]
        probabilities = models['decision_tree'].predict_proba([features])[0]
        
        is_suitable = bool(prediction)
        confidence = float(max(probabilities)) * 100
        
        if is_suitable:
            verdict = "✓ Suitable Product"
            explanation = "This product matches your skin profile and is likely to give good results"
        else:
            verdict = "✗ Not Suitable"
            explanation = "This product may not be ideal for your skin type and conditions"
        
        return {
            "algorithm": "Decision Tree",
            "verdict": verdict,
            "is_suitable": is_suitable,
            "confidence": round(confidence, 2),
            "explanation": explanation,
            "expected_satisfaction": "High (7+/10)" if is_suitable else "Low (<7/10)",
            "input_features": data.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/ann")
async def predict_satisfaction(data: SatisfactionInput):
    """
    Artificial Neural Network: Advanced satisfaction prediction
    Business Context: Uses deep learning to predict product satisfaction score
    """
    try:
        ensure_model_keys(['ann', 'ann_scaler'])
        # Prepare features
        features = [
            data.age,
            data.oil_production,
            data.hydration_level,
            data.sensitivity_level,
            data.pore_size,
            data.wrinkle_score,
            data.suitable_for_oily,
            data.suitable_for_dry,
            data.suitable_for_sensitive,
            data.has_fragrance,
            data.has_alcohol,
            data.is_hypoallergenic
        ]
        
        # Scale and predict
        features_scaled = models['ann_scaler'].transform([features])
        prediction = models['ann'].predict(features_scaled, verbose=0)[0][0]
        
        # Interpret score
        score = float(prediction)
        if score >= 8:
            rating = "Excellent Match"
            emoji = "🌟"
        elif score >= 7:
            rating = "Good Match"
            emoji = "✓"
        elif score >= 5:
            rating = "Average Match"
            emoji = "○"
        else:
            rating = "Poor Match"
            emoji = "✗"
        
        return {
            "algorithm": "Artificial Neural Network (ANN)",
            "predicted_satisfaction_score": round(score, 2),
            "rating": f"{emoji} {rating}",
            "interpretation": f"Expected satisfaction: {round(score, 1)}/10",
            "recommendation": "Highly recommended" if score >= 7 else "Consider alternatives" if score >= 5 else "Not recommended",
            "deep_learning_insight": "This prediction uses neural network analysis of complex patterns in user-product interactions",
            "input_features": data.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check for deployment"""
    return {"status": "healthy", "models_loaded": len(models) > 0}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
