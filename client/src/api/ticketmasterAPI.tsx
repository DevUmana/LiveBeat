import Auth from "../utils/auth";

const retrieveEvents = async (city: string | undefined) => {
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
    const events = data._embedded.events.map((event: any) => ({
      title: event.name,
      date: event.dates.start.localDate,
      address: event._embedded.venues[0].name,
      link: event.url,
      thumbnail: event.images[0].url,
    }));

    const uniqueEvents = events.filter(
      (event: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.title === event.title)
    );

    return uniqueEvents; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

const retrieveUpcomingEvents = async () => {
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

    const events = data._embedded.events.map((event: any) => ({
      title: event.name,
      date: event.dates.start.localDate,
      address: event._embedded.venues[0].name,
      link: event.url,
      thumbnail: event.images[0].url,
    }));

    const uniqueEvents = events.filter(
      (event: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t.title === event.title)
    );

    const uniqueEvents3 = uniqueEvents.slice(0, 3);

    return uniqueEvents3; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

export { retrieveEvents, retrieveUpcomingEvents };
