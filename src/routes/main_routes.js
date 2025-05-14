import { Router } from 'express';
import userRoutes from './user_routes.js';
import eventRoutes from './events_routes.js';
import ministeryRoutes from './ministery_routes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/ministeries', ministeryRoutes);

export default router;