import { EventData } from "../interfaces/EventData";
import Auth from "../utils/auth";

// Function to retrieve events from the Ticketmaster API
const retrieveEvents = async (city: string | undefined) => {
  // Make a POST request to the API
  try {
    const response = await fetch("/api/search/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      method: "POST",
      body: JSON.stringify({ city: city }),
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check network tab!");
    }

    const data = await response.json();

    // Transform the data
    const events: EventData[] = data._embedded.events.map((event: any) => ({
      title: event.name,
      date: event.dates.start.dateTime,
      address: event._embedded.venues[0].name,
      link: event.url,
      thumbnail: event.images[0].url,
    }));

    // Filter out duplicate events
    const uniqueEvents = events.filter(
      (event: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.title === event.title)
    );

    console.log("Unique Events:", uniqueEvents);

    return uniqueEvents; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

// Function to retrieve upcoming events from the Ticketmaster API
const retrieveUpcomingEvents = async () => {
  // Make a GET request to the server to get all events
  try {
    const response = await fetch("/api/search/upcoming", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check network tab!");
    }

    const data = await response.json();

    // Transform the data
    const events: EventData[] = data._embedded.events.map((event: any) => ({
      title: event.name,
      date: event.dates.start.dateTime,
      address: event._embedded.venues[0].name,
      link: event.url,
      thumbnail: event.images[0].url,
    }));

    // Filter out duplicate events
    const uniqueEvents = events.filter(
      (event: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.title === event.title)
    );

    // Limit the number of events to 3
    const uniqueEvents3 = uniqueEvents.slice(0, 3);

    return uniqueEvents3; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

export { retrieveEvents, retrieveUpcomingEvents };
