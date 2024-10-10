import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import StoredEvents from "./StoredEvents";
import { retrieveEvents } from "../api/ticketmasterAPI";
import { getEvents } from "../api/eventsAPI";
import { EventData } from "../interfaces/EventData";
import Table from "./Table";

interface SearchEventProps {
  city: (cityName: string) => void;
}

const SearchEvent = ({ city }: SearchEventProps) => {
  const [search, setSearch] = useState<string>("");
  const [eventList, setEventList] = useState([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [searchMessage, setSearchMessage] = useState<string>("");

  const fetchEvents = async () => {
    const storedEvents = await getEvents();
    setEventList(storedEvents || []);
  };

  useEffect(() => {
    fetchEvents(); // Initial load to fetch stored events
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!search) {
      setSearchMessage("Please enter a city");
      return;
    }

    const retrievedEvents = await retrieveEvents(search);
    setEvents(retrievedEvents);
    city(search);
    setSearchMessage(search ? `Results for ${search}` : "");
    // clear the search field
    setSearch("");
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="section-se">
        <div className="container-se">
          <div className="search-event">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Enter a City"
                value={search}
                onChange={handleTextChange}
              />
              <button type="submit">Search</button>
            </form>
            <p>{searchMessage}</p>
          </div>
          {events.length === 0 ? (
            <div className="no-results">
              <h2>Search for an event</h2>
            </div>
          ) : (
            <div className="search-results">
              <Table events={events} onEventAdded={fetchEvents} />
            </div>
          )}
        </div>
        {eventList.length > 0 && (
          <StoredEvents eventList={eventList} onEventRemoved={fetchEvents} />
        )}
      </section>
    </>
  );
};

export default SearchEvent;
