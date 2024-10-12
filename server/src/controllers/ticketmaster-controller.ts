import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Use environment variable to store the API key securely
const apiKey = process.env.TICKETMASTER_API_KEY;

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const city = req.body.city;

  if (!city) {
    res.status(400).json({ error: 'City query parameter is required' });
    return;
  }

  try {
    // Fetch events from Ticketmaster API
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${encodeURIComponent(
        city
      )}&classificationName=music&sort=date,name,asc`
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    const data = await response.json();
    // Extract relevant event data

    res.json(data); // Send the events data as a JSON response
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }

  console.log('Fetching events in', city);
};

export const getUpcomingEvents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch events from Ticketmaster API, only get unique events
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=music&city=New+York&sort=date,name,asc`
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    const data = await response.json();

    res.json(data); // Send the events data as a JSON response
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
};
