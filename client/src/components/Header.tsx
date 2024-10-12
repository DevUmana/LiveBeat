import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Header = () => {
  // State to check if the user is logged in
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in
  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    checkLogin();
  }, []); // Run only once when the component mounts

  // Check if the user is logged in when the loginCheck state changes (i.e., when the user logs in or logs out)
  return (
    <>
      <header>
        <h1 className="header-title">Welcome to LiveBeat</h1>
        <div className="button-group">
          {loginCheck ? (
            <button
              type="button"
              onClick={() => {
                auth.logout();
                setLoginCheck(false); // Update state to reflect logged-out status
                // Redirect to the login page
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <button type="button">
                <Link to="/signup">Signup</Link>{' '}
                {/* Redirect to the signup page */}
              </button>
              <button type="button">
                <Link to="/login">Login</Link>
                {/* Redirect to the login page */}
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
