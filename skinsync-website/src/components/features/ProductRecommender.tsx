import React, { useState } from 'react';

interface ProductRecommendation {
    productName: string;
    suitability: string;
}

const ProductRecommender: React.FC = () => {
    const [skinType, setSkinType] = useState<string>('');
    const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSkinType(event.target.value);
    };

    const fetchRecommendations = async () => {
        // Placeholder for API call to fetch recommendations based on skin type
        const response = await fetch(`/api/recommendations?skinType=${skinType}`);
        const data = await response.json();
        setRecommendations(data);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetchRecommendations();
    };

    return (
        <div>
            <h2>Product Recommender</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your skin type:
                    <input type="text" value={skinType} onChange={handleInputChange} />
                </label>
                <button type="submit">Get Recommendations</button>
            </form>
            <div>
                <h3>Recommendations:</h3>
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={index}>
                            {rec.productName} - {rec.suitability}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductRecommender;