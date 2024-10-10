import express from "express";
import { getHotels } from "../../controllers/hotels-controller.js";

const router = express.Router();

// GET hotels
router.post("/", getHotels);

export { router as hotelsRouter };
