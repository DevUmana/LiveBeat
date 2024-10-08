import { Router } from "express";
import { eventsRouter } from "./events-routes.js";
import { userRouter } from "./user-routes.js";
import { authenticateToken } from "../../middleware/auth.js";
import { ticketmasterRouter } from "./ticketmaster-routes.js";

const router = Router();

router.use("/search", ticketmasterRouter);
router.use("/events", authenticateToken, eventsRouter);
router.use("/users", authenticateToken, userRouter);

export default router;
