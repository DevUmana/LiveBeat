import React from "react";
import Row from "./Row";
import { createEvent, getEvents } from "../api/eventsAPI";
import { EventData } from "../interfaces/EventData";

interface TableProps {
  events: EventData[];
  onEventAdded: () => void; // Callback function to notify parent of new event addition
}

// add event to the list
const addEvent = async (event: EventData, onEventAdded: () => void) => {
  console.log("Adding event", event);

  // check if the event already exists
  const events = await getEvents();
  const foundEvent = events.find((e: EventData) => e.title === event.title);

  if (foundEvent) {
    console.log("Event already exists");
    return;
  }

  await createEvent(event);
  onEventAdded(); // Notify parent component to refresh the event list
};

const Table: React.FC<TableProps> = ({ events, onEventAdded }) => {
  return (
    <>
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
          {events.map((event, index) => (
            <Row
              key={index}
              event={event}
              addEvent={() => addEvent(event, onEventAdded)} // Pass the callback to addEvent
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
