import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
} from '../../controllers/events-controller.js';

const router = express.Router();

// GET /events - Get all events
router.get('/', getAllEvents);

// GET /events/:id - Get an event by id
router.get('/:id', getEventById);

// POST /events - Create a new event
router.post('/', createEvent);

// DELETE /events/:id - Delete an event by id
router.delete('/:id', deleteEvent);

export { router as eventsRouter };