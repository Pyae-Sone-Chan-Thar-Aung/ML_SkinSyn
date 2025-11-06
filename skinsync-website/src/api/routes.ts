Sure, here's the contents for the file: /skinsync-website/skinsync-website/src/api/routes.ts

import { Router } from 'express';
import RecommendationsController from './controllers/recommendations';

const router = Router();
const recommendationsController = new RecommendationsController();

// Route for getting product recommendations
router.post('/recommendations', recommendationsController.getRecommendations);

// Route for getting user profile
router.get('/user/:id', recommendationsController.getUserProfile);

export default router;