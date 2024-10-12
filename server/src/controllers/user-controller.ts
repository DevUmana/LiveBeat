import { Request, Response } from "express";
import { User } from "../models/user.js";

// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  // get the user from the request
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/current
export const getCurrentUser = async (req: Request, res: Response) => {
  // get the user from the request
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      res.json(user.id);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  // get the id from the request parameters
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:username
export const getUserByUsername = async (req: Request, res: Response) => {
  // get the username from the request parameters
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:email
export const getUserByEmail = async (req: Request, res: Response) => {
  // get the email from the request parameters
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  // get the username, email, password, and confirmPassword from the request body
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  let user = await User.findOne({ where: { username } });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  let emailCheck = await User.findOne({ where: { email } });
  if (emailCheck) {
    return res.status(400).json({ message: "Email already taken" });
  }

  try {
    await User.create({ username, email, password });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  // get the id from the request parameters
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  // get the id from the request parameters
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
