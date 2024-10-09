import { useEffect, useState } from "react";
import { retrieveUpcomingEvents } from "../api/ticketmasterAPI";
import Card from "./Card";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await retrieveUpcomingEvents();
      setEvents(events);
    };

    fetchEvents();
  }, []);

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
