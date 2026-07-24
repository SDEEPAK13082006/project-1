import { Router } from 'express';
import { ChildController } from '../controllers/childController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateJWT, ChildController.getProfiles);
router.post('/', authenticateJWT, ChildController.createProfile);

export default router;
