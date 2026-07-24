import { Router } from 'express';
import { DreamRoomController } from '../controllers/dreamRoomController';

const router = Router();

router.get('/', DreamRoomController.getRoomConfig);

export default router;
