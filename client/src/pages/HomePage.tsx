import './HomePage.css';

const HomePage = () => {
  return (
    <main className="main-container">
      <h1 className="header-title">Welcome to LiveBeat</h1>
      <p className="description">Your ultimate destination for music events and artist performances.</p>
      <div className="button-group">
        <button className="button">Upcoming Events</button>
        <button className="button">Join Us Now</button>
      </div>
    </main>
  );
};

export default HomePage;

