import { useEffect, useState } from "react";
import { getHotels } from "../api/hotelsAPI";
import { HotelData } from "../interfaces/HotelData";
import HotelCard from "./HotelCard";

interface HotelsProps {
  city: string;
}

const Hotels = ({ city }: HotelsProps) => {
  const [hotels, setHotels] = useState<HotelData[]>([]);

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
