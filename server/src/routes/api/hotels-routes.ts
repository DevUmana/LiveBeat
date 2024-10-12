import express from 'express';
import { getHotels } from '../../controllers/hotels-controller.js';

const router = express.Router();

// POST /hotels - Gets hotels for a given city
router.post('/', getHotels);

export { router as hotelsRouter };
