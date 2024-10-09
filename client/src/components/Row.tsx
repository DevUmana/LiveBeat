import React from "react";

interface Event {
  title: string;
  date: string;
  address: string;
  link: string;
  thumbnail: string;
}

interface RowProps {
  event: Event;
  addEvent: () => void;
}

const Row: React.FC<RowProps> = ({ event, addEvent }) => {
  return (
    <tr>
      <td>{event.title}</td>
      <td>{new Date(event.date).toLocaleDateString()}</td>
      <td>{event.address}</td>
      <td>
        <img src={event.thumbnail} alt={event.title} className="row-img" />
      </td>
      <td>
        <a href={event.link} target="_blank" rel="noreferrer">
          More info
        </a>
      </td>
      <td>
        <button
          className="button add"
          onClick={addEvent}
          aria-label="Add Event"
        >
          <span className="non-selectable">+</span>
        </button>
      </td>
    </tr>
  );
};

export default Row;
