import { HotelData } from "../interfaces/HotelData";
import { getHotels } from "../api/hotelsAPI";
import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";

// Interface for HotelsProps
interface HotelsProps {
  city: string;
}

// Hotels component with city prop
const Hotels = ({ city }: HotelsProps) => {
  // State to store hotels
  const [hotels, setHotels] = useState<HotelData[]>([]);

  // Fetch hotels on city change
  useEffect(() => {
    const fetchHotels = async () => {
      const hotels = await getHotels(city); // Pass city to the API call
      setHotels(hotels);
    };

    if (city) {
      console.log("city: ", city);
      fetchHotels();
    }
  }, [city]);

  // Display hotels
  return (
    <>
      <section className="eventsNearBy">
        <div className="events-x1">
          <h2>Stay in Comfort Near {city}</h2>
          <div className="events">
            {hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotels;
