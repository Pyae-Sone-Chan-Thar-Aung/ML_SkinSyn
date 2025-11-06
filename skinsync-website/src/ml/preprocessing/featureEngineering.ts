import { DataFrame } from 'pandas-js';

// Function to extract features from the dataset
export function extractFeatures(df: DataFrame): DataFrame {
    // Map sensitivity levels to numerical values
    const sensitivityMap = { 'low': 0, 'medium': 1, 'high': 2, 'very_high': 3 };
    df = df.assign({
        sensitivity_code: df.get('sensitivity_level').map(sensitivityMap),
        skin_code: df.get('skin_type').map({ 'oily': 0, 'dry': 1, 'combination': 2, 'normal': 3 })
    });

    // Parse ingredients into boolean flags for common tokens
    const tokens = ['fragrance', 'alcohol', 'salicylic', 'niacinamide', 'hyaluronic', 'benzoyl', 'glycerin', 'shea', 'aloe', 'vitamin c'];
    tokens.forEach(token => {
        df = df.assign({ [`has_${token}`]: df.get('ingredients').str.lower().str.contains(token).astype('int') });
    });

    // Simple sentiment feature from review_text
    const posWords = ['good', 'love', 'helped', 'improved', 'calmed', 'softer', 'hydrating', 'bright'];
    df = df.assign({
        review_pos: df.get('review_text').str.lower().apply(text => posWords.some(word => text.includes(word)) ? 1 : 0)
    });

    return df;
}

// Function to prepare the final feature set for model training
export function prepareFeatureSet(df: DataFrame): { features: string[], target: string } {
    const features = ['sensitivity_code', 'skin_code', 'product_price', 'days_used', 'review_pos', ...df.columns.filter(col => col.startsWith('has_'))];
    const target = 'reaction';
    return { features, target };
}