const SearchEvent = () => {
  return (
    <>
      <section className="search-event">
        <form>
          <label htmlFor="search">Search Event: </label>
          <input type="text" id="search" name="search" />
          <button type="submit">Search</button>
        </form>
        {/* Need to add result table */}
      </section>
    </>
  );
};

export default SearchEvent;
