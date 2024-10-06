// import { ApiMessage } from '../interfaces/ApiMessage';
import { EventData } from "../interfaces/EventData";
import Auth from "../utils/auth";
import dotenv from "dotenv";

dotenv.config();

const api_key = process.env.SERPAPI_KEY;

// External Calls

// Making SerpAPI call by Concerts in city

const searchConcertByCity = async (city: string) => {
  // city will be passed in from form
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=Concerts+in+${city}&engine=google&api_key=${api_key}`
    );

    const data = await response.json();
    const eventsData = data.events_results;
    const eventsArray = [];
    eventsArray.push(eventsData[0]);
    eventsArray.push(eventsData[1]);
    eventsArray.push(eventsData[2]);

    console.log(eventsArray);

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return eventsArray;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

// Making SerpAPI call by Concerts in city and within a date range

const searchConcertByCityandDate = async (
  city: string,
  date1: string,
  date2: string
) => {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=Concerts+in+${city}+between${date1}+and+${date2}&engine=google&api_key=${api_key}`
    );
    const data = await response.json();

    const eventsArray = [];
    eventsArray.push(data.events_results[0]);
    eventsArray.push(data.events_results[1]);
    eventsArray.push(data.events_results[2]);

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return eventsArray;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

// Internal Calls

const retrieveEvents = async () => {
  try {
    const response = await fetch("/api/events/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

const retrieveEvent = async (id: number | null): Promise<EventData> => {
  try {
    const response = await fetch(`/api/events/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Could not invalid API response, check network tab!");
    }
    return data;
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return Promise.reject("Could not fetch singular ticket");
  }
};

const createEvent = async (body: EventData) => {
  try {
    const response = await fetch("/api/events/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from Ticket Creation: ", err);
    return Promise.reject("Could not create ticket");
  }
};

export {
  searchConcertByCity,
  searchConcertByCityandDate,
  retrieveEvents,
  retrieveEvent,
  createEvent,
};
