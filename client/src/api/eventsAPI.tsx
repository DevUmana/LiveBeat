//import { ApiMessage } from "../interfaces/ApiMessage";
import { EventData } from "../interfaces/EventData";
import Auth from "../utils/auth";

const getEvents = async () => {
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

const deleteEvent = async (id: number | null) => {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }

    return response;
  } catch (err) {
    console.log("Error from Ticket Deletion: ", err);
    return Promise.reject("Could not delete ticket");
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

    if (!response.ok) {
      throw new Error("invalid API response, check network tab!");
    }
    console.log("created event", response);
  } catch (err) {
    console.log("Error from Event Creation: ", err);
    return Promise.reject("Could not create ticket");
  }
};

export { getEvents, deleteEvent, createEvent };
