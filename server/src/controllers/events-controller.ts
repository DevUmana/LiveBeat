import { Request, Response } from 'express';
import { Event } from '../models/events.js';

// GET /Events
export const getAllEvents = async (req: Request, res: Response) => {
  // get the user from the request
  const user = req.user?.userId;

  try {
    // find all the events for the given user
    const events = await Event.findAll({ where: { userId: user } });
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Events/:id
export const getEventById = async (req: Request, res: Response) => {
  // get the id from the request parameters
  const { id } = req.params;
  try {
    // find the event by the id
    const event = await Event.findByPk(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Events
export const createEvent = async (req: Request, res: Response) => {
  // get the title, date, address, thumbnail, and link from the request body
  const { title, date, address, thumbnail, link } = req.body;
  const userId = req.user?.userId || 0;

  try {
    const newEvent = await Event.create({
      title,
      date,
      address,
      thumbnail,
      link,
      userId,
    });
    res.status(201).json(newEvent);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Events/:id
export const deleteEvent = async (req: Request, res: Response) => {
  // get the id from the request parameters
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event) {
      await event.destroy();
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
