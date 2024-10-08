import express from "express";
import { getEvents } from "../../controllers/ticketmaster-controller.js";

const router = express.Router();

router.post("/", getEvents);

export { router as ticketmasterRouter };
