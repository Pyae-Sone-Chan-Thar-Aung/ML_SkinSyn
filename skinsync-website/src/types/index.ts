export interface UserProfile {
    userId: number;
    skinType: string;
    sensitivityLevel: string;
    preferences: string[];
}

export interface Product {
    productId: number;
    productName: string;
    ingredients: string[];
    price: number;
}

export interface Recommendation {
    userId: number;
    recommendedProducts: Product[];
}

export interface IngredientAnalysis {
    ingredient: string;
    suitability: string;
    benefits: string[];
}