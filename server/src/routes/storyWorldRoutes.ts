import { Router } from 'express';
import { StoryWorldController } from '../controllers/storyWorldController';

const router = Router();

router.get('/', StoryWorldController.getAllWorlds);
router.get('/:id', StoryWorldController.getWorldById);

export default router;
