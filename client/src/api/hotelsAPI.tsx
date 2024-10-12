import Auth from '../utils/auth';

// Get all hotels
const getHotels = async (city: string | undefined) => {
  // Make a POST request to the API
  try {
    const response = await fetch('/api/hotels/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      method: 'POST',
      body: JSON.stringify({ city: city }),
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    const data = await response.json();
    console.log('Received data from API:', data);

    // Check if the data is an array
    if (Array.isArray(data)) {
      // Return the data as is
      return data;
    } else if (data && Array.isArray(data.hotels)) {
      // Return the transformed hotels array
      return data.hotels;
    } else {
      console.error('Unexpected data structure:', data);
      return [];
    }
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

export { getHotels };
