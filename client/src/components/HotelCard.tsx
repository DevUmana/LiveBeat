import { HotelData } from '../interfaces/HotelData';
import React from 'react';

// Interface for HotelProps
interface HotelProps {
  hotel: HotelData;
}

// Card component with hotel
const HotelCard: React.FC<HotelProps> = ({ hotel }) => {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img
            src={hotel.photos || 'fallback-image-url.jpg'}
            alt={hotel.name || 'Hotel Image'}
          />
        </div>
        <div className="card-content">
          <h3>{hotel.name}</h3>
          <p>
            {hotel.rating
              ? `Rating: ${hotel.rating.toFixed(1)}`
              : 'Rating not available'}
          </p>
          <p>{hotel.address}</p>
          <a href={hotel.link || '#'} target="_blank" rel="noreferrer">
            More info
          </a>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
