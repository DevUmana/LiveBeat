import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.HOTELS_API_KEY;

export const getHotels = async (req: Request, res: Response): Promise<void> => {
  const city = req.body.city;

  if (!city) {
    res.status(400).json({ error: "City query parameter is required" });
    return;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=hotels+in+${encodeURIComponent(
        city
      )}&type=lodging&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Invalid API response, check network tab!");
    }

    const data = await response.json();

    data.results = data.results.slice(0, 3);

    const hotels = data.results.map((hotel: any) => ({
      name: hotel.name,
      address: hotel.formatted_address,
      rating: hotel.rating,
      link: `https://www.google.com/maps/place/?q=place_id:${hotel.place_id}`,
      photos:
        hotel.photos && hotel.photos.length > 0
          ? getPhotoUrl(hotel.photos[0].photo_reference)
          : null,
    }));

    res.json({ hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "An error occurred while fetching hotels" });
  }
};

// Helper function to construct the photo URL
function getPhotoUrl(photoReference: string): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
}
