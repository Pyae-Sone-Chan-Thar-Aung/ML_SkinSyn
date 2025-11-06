"""
Train all 6 ML models for SkinSync
"""
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder, RobustScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, mean_squared_error, classification_report, r2_score
import numpy as np
import pandas as pd
import joblib
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import os
import json

# Create models directory
os.makedirs('models', exist_ok=True)

# Reproducibility
np.random.seed(42)

def load_data():
    """Load the combined dataset"""
    print("Loading data...")
    df = pd.read_csv('data/combined_data.csv')
    print(f"[OK] Loaded {len(df)} records")
    return df

def train_linear_regression(df):
    """
    Algorithm 1: Linear Regression
    Purpose: Predict skin hydration level based on user characteristics
    """
    print("\n=== Training Linear Regression Model ===")
    print("Purpose: Predict skin hydration levels")
    
    # Features for predicting hydration
    features = ['age', 'oil_production', 'sensitivity_level', 'pore_size']
    X = df[features].values
    y = df['hydration_level'].values
    
    # Split data with stratification consideration
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Use RobustScaler for better handling of outliers
    scaler = RobustScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Hyperparameter tuning for Ridge Regression
    ridge = Ridge()
    param_grid = {"alpha": [0.1, 0.3, 1.0, 3.0, 10.0]}
    grid = GridSearchCV(ridge, param_grid, cv=5, scoring='r2', n_jobs=-1)
    grid.fit(X_train_scaled, y_train)
    model = grid.best_estimator_
    
    # Cross-validation score
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='r2')
    print(f"[OK] Cross-validation R² scores: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
    
    # Evaluate
    train_pred = model.predict(X_train_scaled)
    test_pred = model.predict(X_test_scaled)
    train_rmse = np.sqrt(mean_squared_error(y_train, train_pred))
    test_rmse = np.sqrt(mean_squared_error(y_test, test_pred))
    
    print(f"[OK] Training RMSE: {train_rmse:.4f}")
    print(f"[OK] Testing RMSE: {test_rmse:.4f}")
    r2 = model.score(X_test_scaled, y_test)
    print(f"[OK] R² Score: {r2:.4f}")
    
    # Save model and scaler
    joblib.dump(model, 'models/linear_regression.pkl')
    joblib.dump(scaler, 'models/linear_regression_scaler.pkl')
    joblib.dump(features, 'models/linear_regression_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "Ridge Regression",
        "cv_r2_mean": float(cv_scores.mean()),
        "cv_r2_std": float(cv_scores.std()),
        "train_rmse": float(train_rmse),
        "test_rmse": float(test_rmse),
        "test_r2": float(r2),
    }
    return model, scaler, metrics

def train_naive_bayes(df):
    """
    Algorithm 2: Naive Bayes
    Purpose: Classify skin type based on user characteristics
    """
    print("\n=== Training Naive Bayes Model ===")
    print("Purpose: Classify skin type (Oily, Dry, Combination, Sensitive, Normal)")
    
    # Features for skin type classification
    features = ['age', 'oil_production', 'hydration_level', 'sensitivity_level', 'pore_size']
    X = df[features].values
    y = df['skin_type'].values
    
    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Hyperparameter tuning for variance smoothing
    gnb = GaussianNB()
    param_grid = {"var_smoothing": [1e-9, 1e-8, 1e-7, 1e-6]}
    grid = GridSearchCV(gnb, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
    grid.fit(X_train_scaled, y_train)
    model = grid.best_estimator_
    
    # Cross-validation
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
    print(f"[OK] Cross-validation Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
    
    # Evaluate
    train_acc = accuracy_score(y_train, model.predict(X_train_scaled))
    test_acc = accuracy_score(y_test, model.predict(X_test_scaled))
    
    print(f"[OK] Training Accuracy: {train_acc:.4f}")
    print(f"[OK] Testing Accuracy: {test_acc:.4f}")
    
    # Save model
    joblib.dump(model, 'models/naive_bayes.pkl')
    joblib.dump(scaler, 'models/naive_bayes_scaler.pkl')
    joblib.dump(label_encoder, 'models/naive_bayes_encoder.pkl')
    joblib.dump(features, 'models/naive_bayes_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "Naive Bayes",
        "cv_acc_mean": float(cv_scores.mean()),
        "cv_acc_std": float(cv_scores.std()),
        "train_acc": float(train_acc),
        "test_acc": float(test_acc),
    }
    return model, scaler, label_encoder, metrics

def train_knn(df):
    """
    Algorithm 3: K-Nearest Neighbors
    Purpose: Recommend products based on similar users
    """
    print("\n=== Training KNN Model ===")
    print("Purpose: Recommend products based on similar user profiles")
    
    # Features for product recommendation
    features = ['age', 'oil_production', 'hydration_level', 'sensitivity_level', 'pore_size', 'wrinkle_score']
    X = df[features].values
    y = df['would_recommend'].values
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Hyperparameter tuning for KNN
    param_grid = {'n_neighbors': [3, 5, 7, 9, 11], 'weights': ['uniform', 'distance']}
    grid_search = GridSearchCV(KNeighborsClassifier(), param_grid, cv=5, scoring='accuracy')
    grid_search.fit(X_train_scaled, y_train)
    model = grid_search.best_estimator_
    print(f"[OK] Best KNN parameters: {grid_search.best_params_}")
    
    # Evaluate
    train_acc = accuracy_score(y_train, model.predict(X_train_scaled))
    test_acc = accuracy_score(y_test, model.predict(X_test_scaled))
    
    print(f"[OK] Training Accuracy: {train_acc:.4f}")
    print(f"[OK] Testing Accuracy: {test_acc:.4f}")
    
    # Save model
    joblib.dump(model, 'models/knn.pkl')
    joblib.dump(scaler, 'models/knn_scaler.pkl')
    joblib.dump(features, 'models/knn_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "KNN",
        "train_acc": float(train_acc),
        "test_acc": float(test_acc),
        "best_params": grid_search.best_params_,
    }
    return model, scaler, metrics

def train_svm(df):
    """
    Algorithm 4: Support Vector Machine
    Purpose: Detect potential allergen risks
    """
    print("\n=== Training SVM Model ===")
    print("Purpose: Detect potential allergen risks and reactions")
    
    # Features for allergen detection
    features = ['sensitivity_level', 'has_fragrance', 'has_alcohol', 'is_hypoallergenic']
    X = df[features].values
    y = df['had_reaction'].values
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Hyperparameter tuning for SVM
    svm = SVC(kernel='rbf', probability=True, random_state=42)
    param_grid = {
        "C": [0.5, 1, 3, 10],
        "gamma": ['scale', 0.1, 0.01, 0.001]
    }
    grid = GridSearchCV(svm, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
    grid.fit(X_train_scaled, y_train)
    model = grid.best_estimator_
    
    # Cross-validation
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
    print(f"[OK] Cross-validation Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
    
    # Evaluate
    train_acc = accuracy_score(y_train, model.predict(X_train_scaled))
    test_acc = accuracy_score(y_test, model.predict(X_test_scaled))
    
    print(f"[OK] Training Accuracy: {train_acc:.4f}")
    print(f"[OK] Testing Accuracy: {test_acc:.4f}")
    
    # Save model
    joblib.dump(model, 'models/svm.pkl')
    joblib.dump(scaler, 'models/svm_scaler.pkl')
    joblib.dump(features, 'models/svm_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "SVM",
        "cv_acc_mean": float(cv_scores.mean()),
        "cv_acc_std": float(cv_scores.std()),
        "train_acc": float(train_acc),
        "test_acc": float(test_acc),
        "best_params": grid.best_params_,
    }
    return model, scaler, metrics

def train_decision_tree(df):
    """
    Algorithm 5: Decision Tree
    Purpose: Classify product suitability
    """
    print("\n=== Training Decision Tree Model ===")
    print("Purpose: Classify product suitability based on user profile")
    
    # Create suitability target based on satisfaction score
    df['is_suitable'] = (df['satisfaction_score'] >= 7).astype(int)
    
    # Features for suitability classification
    features = ['age', 'sensitivity_level', 'oil_production', 'hydration_level', 
                'suitable_for_oily', 'suitable_for_dry', 'suitable_for_sensitive',
                'has_fragrance', 'has_alcohol']
    X = df[features].values
    y = df['is_suitable'].values
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Use Random Forest for better performance (ensemble of decision trees)
    base = RandomForestClassifier(random_state=42, n_jobs=-1, class_weight='balanced')
    param_grid = {
        "n_estimators": [100, 200, 300],
        "max_depth": [10, 15, 20, None],
        "min_samples_split": [2, 5, 10],
        "min_samples_leaf": [1, 2, 4]
    }
    grid = GridSearchCV(base, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
    grid.fit(X_train, y_train)
    model = grid.best_estimator_
    
    # Cross-validation
    cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    print(f"[OK] Cross-validation Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")
    
    # Evaluate
    train_acc = accuracy_score(y_train, model.predict(X_train))
    test_acc = accuracy_score(y_test, model.predict(X_test))
    
    print(f"[OK] Training Accuracy: {train_acc:.4f}")
    print(f"[OK] Testing Accuracy: {test_acc:.4f}")
    
    # Feature importance
    importance = model.feature_importances_
    print("\nFeature Importance:")
    for i, feat in enumerate(features):
        print(f"  {feat}: {importance[i]:.4f}")
    
    # Save model
    joblib.dump(model, 'models/decision_tree.pkl')
    joblib.dump(features, 'models/decision_tree_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "RandomForest (Suitability)",
        "cv_acc_mean": float(cv_scores.mean()),
        "cv_acc_std": float(cv_scores.std()),
        "train_acc": float(train_acc),
        "test_acc": float(test_acc),
        "best_params": grid.best_params_,
        "feature_importance": {feat: float(imp) for feat, imp in zip(features, importance)}
    }
    return model, metrics

def train_ann(df):
    """
    Algorithm 6: Artificial Neural Network
    Purpose: Advanced skin condition and satisfaction prediction
    """
    print("\n=== Training Artificial Neural Network ===")
    print("Purpose: Predict product satisfaction and skin condition improvement")
    
    # Features for ANN
    features = ['age', 'oil_production', 'hydration_level', 'sensitivity_level', 
                'pore_size', 'wrinkle_score', 'suitable_for_oily', 'suitable_for_dry',
                'suitable_for_sensitive', 'has_fragrance', 'has_alcohol', 'is_hypoallergenic']
    
    X = df[features].values
    y = df['satisfaction_score'].values
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Enhanced Neural Network Architecture
    model = keras.Sequential([
        keras.layers.Dense(256, activation='relu', input_shape=(len(features),)),
        keras.layers.BatchNormalization(),
        keras.layers.Dropout(0.4),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.BatchNormalization(),
        keras.layers.Dropout(0.3),
        keras.layers.Dense(64, activation='relu'),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(32, activation='relu'),
        keras.layers.Dense(1)
    ])
    
    # Use Adam optimizer with learning rate scheduling
    optimizer = keras.optimizers.Adam(learning_rate=0.001)
    model.compile(
        optimizer=optimizer,
        loss='mse',
        metrics=['mae']
    )
    
    # Callbacks for better training
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True
    )
    reduce_lr = ReduceLROnPlateau(
        monitor='val_loss',
        factor=0.5,
        patience=5,
        min_lr=1e-6
    )
    
    # Train model with callbacks
    history = model.fit(
        X_train_scaled, y_train,
        epochs=100,
        batch_size=32,
        validation_split=0.2,
        callbacks=[early_stopping, reduce_lr],
        verbose=0
    )
    
    print(f"[OK] Training stopped at epoch: {len(history.history['loss'])}")
    
    # Evaluate
    train_loss, train_mae = model.evaluate(X_train_scaled, y_train, verbose=0)
    test_loss, test_mae = model.evaluate(X_test_scaled, y_test, verbose=0)
    
    print(f"[OK] Training MAE: {train_mae:.4f}")
    print(f"[OK] Testing MAE: {test_mae:.4f}")
    print(f"[OK] Testing RMSE: {np.sqrt(test_loss):.4f}")
    
    # Save model in native Keras format
    model.save('models/ann_model.keras')
    joblib.dump(scaler, 'models/ann_scaler.pkl')
    joblib.dump(features, 'models/ann_features.pkl')
    
    print("[OK] Model saved")
    metrics = {
        "algorithm": "ANN",
        "train_mae": float(train_mae),
        "test_mae": float(test_mae),
        "test_rmse": float(np.sqrt(test_loss)),
        "epochs_trained": int(len(history.history['loss']))
    }
    return model, scaler, metrics

def main():
    """Train all models"""
    print("="*60)
    print("SkinSync ML Model Training Pipeline")
    print("="*60)
    
    # Load data
    df = load_data()
    
    # Train all models
    metrics_report = {}
    _, _, lr_metrics = train_linear_regression(df)
    _, _, _, nb_model_metrics = train_naive_bayes(df)
    _, _, knn_metrics = train_knn(df)
    _, _, svm_metrics = train_svm(df)
    _, dt_metrics = train_decision_tree(df)
    _, _, ann_metrics = train_ann(df)

    metrics_report["linear_regression"] = lr_metrics
    metrics_report["naive_bayes"] = nb_model_metrics
    metrics_report["knn"] = knn_metrics
    metrics_report["svm"] = svm_metrics
    metrics_report["decision_tree"] = dt_metrics
    metrics_report["ann"] = ann_metrics

    with open('models/metrics.json', 'w') as f:
        json.dump(metrics_report, f, indent=2)
    
    print("\n" + "="*60)
    print("[OK] All models trained successfully!")
    print("="*60)
    print("\nModels saved in 'models/' directory:")
    print("  1. linear_regression.pkl - Hydration prediction")
    print("  2. naive_bayes.pkl - Skin type classification")
    print("  3. knn.pkl - Product recommendation")
    print("  4. svm.pkl - Allergen risk detection")
    print("  5. decision_tree.pkl - Product suitability")
    print("  6. ann_model.keras - Advanced satisfaction prediction")

if __name__ == "__main__":
    main()
