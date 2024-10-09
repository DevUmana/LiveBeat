import React from "react";
import { deleteEvent } from "../api/eventsAPI";

interface Event {
  id: number;
  title: string;
  date: string;
  address: string;
  link: string;
  thumbnail: string;
}

interface StoredEventsProps {
  eventList: Event[];
  onEventRemoved: () => void; // Callback function to notify parent component of removal
}

const removeEvent = async (event: Event, onEventRemoved: () => void) => {
  console.log("Removing event", event);
  await deleteEvent(event.id);
  onEventRemoved(); // Call the callback to notify parent of removal
};

const StoredEvents: React.FC<StoredEventsProps> = ({
  eventList,
  onEventRemoved,
}) => {
  return (
    <div className="stored-events">
      <div className="stored-events-header">
        <h2>Stored Events</h2>
      </div>
      <div className="stored-events-table">
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Thumbnail</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventList.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.address}</td>
                <td>
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="row-img"
                  />
                </td>
                <td>
                  <a href={event.link} target="_blank" rel="noreferrer">
                    More info
                  </a>
                </td>
                <td>
                  <button
                    className="button remove"
                    onClick={() => removeEvent(event, onEventRemoved)} // Pass the callback
                    aria-label="Remove Event"
                  >
                    <span className="non-selectable">-</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoredEvents;
