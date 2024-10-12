import express from 'express';
import {
  getEvents,
  getUpcomingEvents,
} from '../../controllers/ticketmaster-controller.js';

const router = express.Router();

// POST /search - Gets events for a given city
router.post('/', getEvents);

// GET /upcoming - Gets upcoming events
router.get('/upcoming', getUpcomingEvents);

export { router as ticketmasterRouter };
