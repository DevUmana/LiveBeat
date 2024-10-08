import { ChangeEvent, FormEvent, useState } from "react";
import StoredEvents from "./StoredEvents";
import Table from "./Table";

const SearchEvent = () => {
  const [search, setSearch] = useState<String | undefined>("");
  const [result, setResult] = useState<Boolean | undefined>(false);
  const [storedEvents, setStoredEvents] = useState<Boolean | undefined>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (result === true) {
      setResult(false);
      setStoredEvents(false);
    } else {
      setResult(true);
      setStoredEvents(true);
    }
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(search);
    setSearch(e.target.value);
    console.log(search);
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
            <Table />
          )}
        </div>
        {!storedEvents ? null : <StoredEvents />}
      </section>
    </>
  );
};

export default SearchEvent;
