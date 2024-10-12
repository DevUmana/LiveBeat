import { retrieveUpcomingEvents } from "../api/ticketmasterAPI";
import { EventData } from "../interfaces/EventData";
import { useEffect, useState } from "react";
import Card from "./Card";

// UpcomingEvents component
const UpcomingEvents = () => {
  // State to store upcoming events
  const [events, setEvents] = useState<EventData[]>([]);

  // Fetch upcoming events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await retrieveUpcomingEvents();
      setEvents(events);
    };

    fetchEvents();
  }, []);

  // Display upcoming events
  return (
    <>
      <section className="eventsNearBy">
        <div className="events-x1">
          <h2>Upcoming Events!</h2>
          <div className="events">
            {events.map((event, index) => (
              <Card key={index} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;
