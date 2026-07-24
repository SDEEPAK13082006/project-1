import { Router } from 'express';
import { CharacterController } from '../controllers/characterController';

const router = Router();

router.get('/', CharacterController.getCharacters);
router.get('/:id', CharacterController.getCharacterById);

export default router;
