import { Router } from "express";
import { eventsRouter } from "./events-routes.js";
import { userRouter } from "./user-routes.js";
import { ticketmasterRouter } from "./ticketmaster-routes.js";
import { authenticateToken } from "../../middleware/auth.js";
import { hotelsRouter } from "./hotels-routes.js";

const router = Router();

router.use("/search", authenticateToken, ticketmasterRouter);
router.use("/events", authenticateToken, eventsRouter);
router.use("/hotels", hotelsRouter);
router.use("/users", userRouter);

export default router;
