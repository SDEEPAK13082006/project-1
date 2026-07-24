import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendationController';

const router = Router();

router.get('/', RecommendationController.getRecommendations);

export default router;
