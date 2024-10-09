import express from "express";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
} from "../../controllers/events-controller.js";

const router = express.Router();

// GET /events - Get all events
router.get("/", getAllEvents);

// POST /events - Create a new event
router.post("/", createEvent);

// DELETE /events/:id - Delete an event by id
router.delete("/:id", deleteEvent);

export { router as eventsRouter };
