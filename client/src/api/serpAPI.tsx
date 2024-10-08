const retrieveEvents = async (city: string | undefined) => {
  try {
    const response = await fetch("/api/serpapi/", {
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
    const events = data.map((event: any) => ({
      title: event.title,
      date: event.date,
      address: event.address,
      link: event.link,
      thumbnail: event.thumbnail,
    }));

    console.log("Events data:", events);
    return events; // Return the transformed events array
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

export { retrieveEvents };
