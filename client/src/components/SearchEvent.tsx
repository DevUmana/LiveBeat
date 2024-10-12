import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { EventData } from '../interfaces/EventData';
import { retrieveEvents } from '../api/ticketmasterAPI';
import { getEvents } from '../api/eventsAPI';
import StoredEvents from './StoredEvents';
import Table from './Table';

// Interface for SearchEventProps
interface SearchEventProps {
  city: (cityName: string) => void;
}

// SearchEvent component with city prop
const SearchEvent = ({ city }: SearchEventProps) => {
  // State to store search input
  const [search, setSearch] = useState<string>('');
  // State to store search results
  const [eventList, setEventList] = useState([]);
  // State to store search results
  const [events, setEvents] = useState<EventData[]>([]);
  // State to store search message
  const [searchMessage, setSearchMessage] = useState<string>('');

  // Fetch stored events
  const fetchEvents = async () => {
    const storedEvents = await getEvents();
    setEventList(storedEvents || []);
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents(); // Initial load to fetch stored events
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!search) {
      setSearchMessage('Please enter a city');
      return;
    }

    const retrievedEvents = await retrieveEvents(search);
    setEvents(retrievedEvents);
    city(search);
    setSearchMessage(search ? `Results for ${search}` : '');
    // clear the search field
    setSearch('');
  };

  // Handle text change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Return the search event form
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
