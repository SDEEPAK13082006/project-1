import { Router } from 'express';
import authRoutes from './authRoutes';
import childRoutes from './childRoutes';
import storyWorldRoutes from './storyWorldRoutes';
import storyRoutes from './storyRoutes';
import dreamRoomRoutes from './dreamRoomRoutes';
import dashboardRoutes from './dashboardRoutes';
import characterRoutes from './characterRoutes';
import searchRoutes from './searchRoutes';
import recommendationRoutes from './recommendationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/children', childRoutes);
router.use('/story-worlds', storyWorldRoutes);
router.use('/stories', storyRoutes);
router.use('/dream-room', dreamRoomRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/characters', characterRoutes);
router.use('/search', searchRoutes);
router.use('/recommendations', recommendationRoutes);

export default router;
