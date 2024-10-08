import { Router } from "express";
import { serpapiRouter } from "./serpapi-routes.js";
import { eventsRouter } from "./events-routes.js";
import { userRouter } from "./user-routes.js";
import { authenticateToken } from "../../middleware/auth.js";

const router = Router();

router.use("/serpapi", serpapiRouter);
router.use("/events", authenticateToken, eventsRouter);
router.use("/users", authenticateToken, userRouter);

export default router;
