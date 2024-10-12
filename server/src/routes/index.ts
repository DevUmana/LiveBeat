import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Use the routes from the authRoutes and apiRoutes files
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

// Serve the static files from the React app
router.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../client/dist", "index.html"));
});

export default router;
