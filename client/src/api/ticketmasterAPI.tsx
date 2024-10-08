const retrieveEvents = async (city: string | undefined) => {
  try {
    const response = await fetch("/api/search/", {
      headers: {
        "Content-Type": "application/json",
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

    console.log("Events data:", events);
    return events; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

export { retrieveEvents };
