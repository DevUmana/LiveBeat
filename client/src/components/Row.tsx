import { EventData } from "../interfaces/EventData";
import React from "react";

// Interface for RowProps
interface RowProps {
  event: EventData;
  addEvent: () => void; // addEvent function
}

// Row component with event data and addEvent function
const Row: React.FC<RowProps> = ({ event, addEvent }) => {
  // Return the row with event data
  return (
    <tr>
      <td>{event.title}</td>
      <td>{event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</td>
      <td>{event.address}</td>
      <td>
        <img
          src={event.thumbnail ?? ""}
          alt={event.title ?? undefined}
          className="row-img"
        />
      </td>
      <td>
        <a href={event.link ?? ""} target="_blank" rel="noreferrer">
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
