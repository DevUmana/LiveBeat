import { Router } from "express";
import { eventsRouter } from "./events-routes.js";
import { userRouter } from "./user-routes.js";
import { ticketmasterRouter } from "./ticketmaster-routes.js";

const router = Router();

router.use("/search", ticketmasterRouter);
router.use("/events", eventsRouter);
router.use("/users", userRouter);

export default router;
