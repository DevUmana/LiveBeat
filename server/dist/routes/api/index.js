import { Router } from 'express';
// ADD EVENT ROUTER
import { userRouter } from './user-routes.js';
const router = Router();
// ADD EVENT ROUTER
router.use('/users', userRouter);
export default router;
