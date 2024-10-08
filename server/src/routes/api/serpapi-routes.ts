import express from "express";
import { getEvents } from "../../controllers/serpapi.js";

const router = express.Router();

router.post("/", getEvents);

export { router as serpapiRouter };
