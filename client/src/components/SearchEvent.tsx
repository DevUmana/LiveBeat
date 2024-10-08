import { ChangeEvent, FormEvent, useState } from "react";
import StoredEvents from "./StoredEvents";
import { retrieveEvents } from "../api/serpAPI";
import Table from "./Table";

const SearchEvent = () => {
  const [search, setSearch] = useState<string | undefined>("");
  const [result, setResult] = useState<boolean | undefined>(false);
  const [storedEvents, setStoredEvents] = useState<boolean | undefined>(false);
  const [events, setEvents] = useState([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setEvents(await retrieveEvents(search));

    if (result === true) {
      setResult(false);
      setStoredEvents(false);
    } else {
      setResult(true);
      setStoredEvents(false);
    }
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="section-se">
        <div className="container-se">
          <div className="search-event">
            <form onSubmit={handleSubmit}>
              <label htmlFor="search">Search Event: </label>
              <input
                type="text"
                id="search"
                name="search"
                onChange={handleTextChange}
              />
              <button type="submit" onSubmit={handleSubmit}>
                Search
              </button>
            </form>
          </div>
          {!result ? (
            <div>
              <h2>Search for an event</h2>
            </div>
          ) : (
            <Table events={events} />
          )}
        </div>
        {!storedEvents ? null : <StoredEvents />}
      </section>
    </>
  );
};

export default SearchEvent;
