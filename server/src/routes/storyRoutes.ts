import { Router } from 'express';
import { StoryController } from '../controllers/storyController';

const router = Router();

router.post('/generate', StoryController.generateStory);
router.get('/', StoryController.getStories);
router.post('/:id/favorite', StoryController.toggleFavorite);

export default router;
