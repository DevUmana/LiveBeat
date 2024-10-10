import Auth from "../utils/auth";

const getHotels = async (city: string | undefined) => {
  try {
    const response = await fetch("/api/hotels/", {
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
    console.log("Received data from API:", data);

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.hotels)) {
      return data.hotels;
    } else {
      console.error("Unexpected data structure:", data);
      return [];
    }
  } catch (err) {
    console.log("Error from data retrieval: ", err);
    return [];
  }
};

export { getHotels };
