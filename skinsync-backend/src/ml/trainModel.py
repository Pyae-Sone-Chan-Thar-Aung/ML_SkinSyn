import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


def train_skin_type_model():
    # Load your skin condition dataset
    # This is a placeholder - you'll need to replace with your actual data
    data = pd.read_csv('skin_condition_data.csv')

    # Features: skin parameters (oil level, moisture, sensitivity, etc.)
    X = data.drop(['skin_type'], axis=1)
    # Target: skin type classification
    y = data['skin_type']

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Create the model
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu',
                              input_shape=(X.shape[1],)),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(4, activation='softmax')  # 4 skin types
    ])

    # Compile the model
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    # Train the model
    model.fit(X_train_scaled, y_train,
              epochs=50,
              batch_size=32,
              validation_split=0.2)

    # Save the model
    model.save('skin_type_model')

    return model, scaler


if __name__ == "__main__":
    train_skin_type_model()
