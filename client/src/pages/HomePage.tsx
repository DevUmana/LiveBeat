import { useState, useLayoutEffect, useEffect } from 'react';
import UpcomingEvents from '../components/UpcomingEvents';
import SearchEvent from '../components/SearchEvent';
import AuthChecker from '../components/AuthChecker';
import Hotels from '../components/Hotels';
import auth from '../utils/auth';

// HomePage component
const HomePage = () => {
  // State to store login check
  const [loginCheck, setLoginCheck] = useState(false);
  // State to store selected city
  const [selectedCity, setSelectedCity] = useState('');

  // Check if the user is logged in
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  // Check login on component mount
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  // Check login on state change
  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  // Display the homepage
  return (
    <>
      <AuthChecker /> {/* Check if the user is authenticated */}
      {!loginCheck ? ( // Display login notice if not logged in
        <div className="login-notice">
          <img
            src="./public/images/login.png"
            alt="Event Photo"
            className="login-photo"
          />
          <h1>Your Next Adventure Awaits – Log In to Find Events Near You!</h1>
        </div>
      ) : (
        // Display upcoming events, search events, and hotels
        <>
          <UpcomingEvents /> {/* Display upcoming events */}
          <SearchEvent city={setSelectedCity} /> {/* Search for events */}
          {selectedCity && <Hotels city={selectedCity} />}{' '}
          {/* Display hotels */}
        </>
      )}
    </>
  );
};

export default HomePage;
