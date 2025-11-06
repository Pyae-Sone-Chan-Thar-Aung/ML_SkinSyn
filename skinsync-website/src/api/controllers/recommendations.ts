import { Request, Response } from 'express';
import { getRecommendations } from '../../ml/models/knn'; // Example import for KNN model

class RecommendationsController {
    public async getProductRecommendations(req: Request, res: Response): Promise<Response> {
        try {
            const userProfile = req.body; // Expecting user profile data in the request body
            const recommendations = await getRecommendations(userProfile);
            return res.status(200).json(recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

export default new RecommendationsController();