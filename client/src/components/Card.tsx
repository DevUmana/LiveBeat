import React from "react";

interface Event {
  title: string;
  date: string;
  address: string;
  link: string;
  thumbnail: string;
}

interface CardProps {
  events: Event;
}

const Card: React.FC<CardProps> = ({ events }) => {
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={events.thumbnail} alt={events.title} />
        </div>
        <div className="card-content">
          <h3>{events.title}</h3>
          <p>{events.date}</p>
          <p>{events.address}</p>
          <a href={events.link} target="_blank" rel="noreferrer">
            More info
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
