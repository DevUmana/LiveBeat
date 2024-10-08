import express from "express";
import {
  getEvents,
  getUpcomingEvents,
} from "../../controllers/ticketmaster-controller.js";

const router = express.Router();

router.post("/", getEvents);
router.get("/upcoming", getUpcomingEvents);

export { router as ticketmasterRouter };
