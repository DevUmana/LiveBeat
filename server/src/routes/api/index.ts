import { Router } from 'express';
import { eventsRouter } from './events-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/events', eventsRouter);
router.use('/users', userRouter);

export default router;
