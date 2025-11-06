"""
Generate synthetic skincare dataset for training ML models
"""
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
N_SAMPLES = 2000

# Define product categories and ingredients
PRODUCT_TYPES = ['Moisturizer', 'Cleanser', 'Serum', 'Sunscreen', 'Toner', 'Mask']
SKIN_TYPES = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
SKIN_CONDITIONS = ['Acne', 'Rosacea', 'Eczema', 'Hyperpigmentation', 'Aging', 'None']

# Common skincare ingredients
INGREDIENTS = {
    'hydrating': ['Hyaluronic Acid', 'Glycerin', 'Ceramides', 'Squalane'],
    'exfoliating': ['Salicylic Acid', 'Glycolic Acid', 'Lactic Acid', 'Retinol'],
    'soothing': ['Niacinamide', 'Centella Asiatica', 'Aloe Vera', 'Chamomile'],
    'protective': ['Vitamin C', 'Vitamin E', 'Zinc Oxide', 'Titanium Dioxide']
}

def generate_user_data():
    """Generate synthetic user data"""
    data = {
        'user_id': range(1, N_SAMPLES + 1),
        'age': np.random.randint(18, 65, N_SAMPLES),
        'skin_type': np.random.choice(SKIN_TYPES, N_SAMPLES, p=[0.25, 0.20, 0.25, 0.15, 0.15]),
        'skin_condition': np.random.choice(SKIN_CONDITIONS, N_SAMPLES, p=[0.20, 0.10, 0.10, 0.15, 0.20, 0.25]),
        'climate': np.random.choice(['Humid', 'Dry', 'Temperate', 'Cold'], N_SAMPLES),
        'sensitivity_level': np.random.randint(1, 11, N_SAMPLES),  # 1-10 scale
        'oil_production': np.random.randint(1, 11, N_SAMPLES),
        'hydration_level': np.random.randint(1, 11, N_SAMPLES),
        'pore_size': np.random.randint(1, 11, N_SAMPLES),
        'wrinkle_score': np.random.randint(1, 11, N_SAMPLES),
    }
    
    df = pd.DataFrame(data)
    
    # Adjust hydration based on skin type (for Linear Regression)
    df.loc[df['skin_type'] == 'Dry', 'hydration_level'] = np.random.randint(1, 5, (df['skin_type'] == 'Dry').sum())
    df.loc[df['skin_type'] == 'Oily', 'hydration_level'] = np.random.randint(6, 11, (df['skin_type'] == 'Oily').sum())
    
    # Adjust oil production based on skin type
    df.loc[df['skin_type'] == 'Dry', 'oil_production'] = np.random.randint(1, 4, (df['skin_type'] == 'Dry').sum())
    df.loc[df['skin_type'] == 'Oily', 'oil_production'] = np.random.randint(7, 11, (df['skin_type'] == 'Oily').sum())
    
    return df

def generate_product_data():
    """Generate synthetic product data"""
    products = []
    
    for i in range(500):
        product_type = np.random.choice(PRODUCT_TYPES)
        
        # Select ingredients based on product type
        num_ingredients = np.random.randint(3, 8)
        selected_categories = np.random.choice(list(INGREDIENTS.keys()), num_ingredients, replace=True)
        ingredient_list = [np.random.choice(INGREDIENTS[cat]) for cat in selected_categories]
        
        product = {
            'product_id': i + 1,
            'name': f'{product_type} {i+1}',
            'type': product_type,
            'brand': f'Brand {np.random.choice(["A", "B", "C", "D", "E"])}',
            'price': round(np.random.uniform(10, 150), 2),
            'rating': round(np.random.uniform(3.0, 5.0), 1),
            'ingredients': ','.join(ingredient_list),
            'suitable_for_oily': np.random.choice([0, 1]),
            'suitable_for_dry': np.random.choice([0, 1]),
            'suitable_for_sensitive': np.random.choice([0, 1]),
            'suitable_for_combination': np.random.choice([0, 1]),
            'suitable_for_normal': np.random.choice([0, 1]),
            'has_fragrance': np.random.choice([0, 1]),
            'has_alcohol': np.random.choice([0, 1]),
            'is_hypoallergenic': np.random.choice([0, 1]),
            'spf_level': np.random.choice([0, 15, 30, 50]) if product_type == 'Sunscreen' else 0,
        }
        products.append(product)
    
    return pd.DataFrame(products)

def generate_interaction_data(user_df, product_df):
    """Generate user-product interaction data"""
    interactions = []
    
    for _ in range(3000):
        user_id = np.random.choice(user_df['user_id'])
        product_id = np.random.choice(product_df['product_id'])
        
        user = user_df[user_df['user_id'] == user_id].iloc[0]
        product = product_df[product_df['product_id'] == product_id].iloc[0]
        
        # Simulate satisfaction based on skin type match
        base_satisfaction = 5.0
        
        if user['skin_type'] == 'Oily' and product['suitable_for_oily']:
            base_satisfaction += 2
        elif user['skin_type'] == 'Dry' and product['suitable_for_dry']:
            base_satisfaction += 2
        elif user['skin_type'] == 'Sensitive' and product['suitable_for_sensitive']:
            base_satisfaction += 2
        elif user['skin_type'] == 'Combination' and product['suitable_for_combination']:
            base_satisfaction += 2
        elif user['skin_type'] == 'Normal' and product['suitable_for_normal']:
            base_satisfaction += 2
        else:
            base_satisfaction -= 1
        
        # Sensitivity to fragrance and alcohol
        if user['sensitivity_level'] > 7:
            if product['has_fragrance']:
                base_satisfaction -= 1.5
            if product['has_alcohol']:
                base_satisfaction -= 1.5
        
        satisfaction = max(1, min(10, base_satisfaction + np.random.normal(0, 0.5)))
        
        # Allergen risk based on sensitivity and ingredients
        allergen_risk = 0
        if user['sensitivity_level'] > 7:
            allergen_risk = np.random.choice([0, 1], p=[0.7, 0.3])
        else:
            allergen_risk = np.random.choice([0, 1], p=[0.95, 0.05])
        
        interaction = {
            'user_id': user_id,
            'product_id': product_id,
            'satisfaction_score': round(satisfaction, 1),
            'would_recommend': 1 if satisfaction >= 7 else 0,
            'had_reaction': allergen_risk,
            'usage_days': np.random.randint(7, 90)
        }
        interactions.append(interaction)
    
    return pd.DataFrame(interactions)

def main():
    """Generate and save all datasets"""
    print("Generating synthetic skincare dataset...")
    
    # Generate data
    user_df = generate_user_data()
    product_df = generate_product_data()
    interaction_df = generate_interaction_data(user_df, product_df)
    
    # Create combined dataset for training
    # Merge user and interaction data
    combined_df = interaction_df.merge(user_df, on='user_id')
    combined_df = combined_df.merge(product_df, on='product_id')
    
    # Save datasets
    user_df.to_csv('data/users.csv', index=False)
    product_df.to_csv('data/products.csv', index=False)
    interaction_df.to_csv('data/interactions.csv', index=False)
    combined_df.to_csv('data/combined_data.csv', index=False)
    
    print(f"[OK] Generated {len(user_df)} users")
    print(f"[OK] Generated {len(product_df)} products")
    print(f"[OK] Generated {len(interaction_df)} interactions")
    print(f"[OK] Combined dataset: {len(combined_df)} records")
    
    # Print statistics
    print("\n=== Dataset Statistics ===")
    print(f"\nSkin Type Distribution:")
    print(user_df['skin_type'].value_counts())
    print(f"\nProduct Type Distribution:")
    print(product_df['type'].value_counts())
    print(f"\nAverage Satisfaction Score: {interaction_df['satisfaction_score'].mean():.2f}")
    print(f"Allergen Reaction Rate: {interaction_df['had_reaction'].mean()*100:.2f}%")
    
    print("\n[OK] All datasets saved in 'data/' folder")

if __name__ == "__main__":
    import os
    os.makedirs('data', exist_ok=True)
    main()
