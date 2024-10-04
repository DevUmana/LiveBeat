import { Request, Response } from "express";
import { Event } from "../models/events.js";

// GET /Events
export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Events/:id
export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Events
export const createEvent = async (req: Request, res: Response) => {
  const { title, date, address, thumbnail, assignedUserId } = req.body;
  try {
    const newEvent = await Event.create({
      title,
      date,
      address,
      thumbnail,
      assignedUserId,
    });
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Events/:id
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event) {
      await event.destroy();
      res.json({ message: "Event deleted" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
