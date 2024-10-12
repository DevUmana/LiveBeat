import { EventData } from '../interfaces/EventData';
import React from 'react';

// Interface for CardProps
interface CardProps {
  event: EventData;
}

// Card component
const Card: React.FC<CardProps> = ({ event }) => {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={event.thumbnail ?? ''} alt={event.title ?? undefined} />
        </div>
        <div className="card-content">
          <h3>{event.title}</h3>
          <p>
            {event.date
              ? new Date(event.date).toLocaleDateString()
              : 'Date not available'}
          </p>
          <p>{event.address}</p>
          <a href={event.link || '#'} target="_blank" rel="noreferrer">
            More info
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
