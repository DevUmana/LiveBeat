import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} from "../../controllers/user-controller.js";

import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();

// GET /users - Get all users
router.get("/", authenticateToken, getAllUsers);

// GET /users/:id - Get a user by id
router.get("/:id", authenticateToken, getUserById);

// POST /users - Create a new user
router.post("/", createUser);

// PUT /users/:id - Update a user by id
router.put("/:id", authenticateToken, updateUser);

// DELETE /users/:id - Delete a user by id
router.delete("/:id", authenticateToken, deleteUser);

// GET /users/current - Get the current user
router.get("/current", authenticateToken, getCurrentUser);

export { router as userRouter };
