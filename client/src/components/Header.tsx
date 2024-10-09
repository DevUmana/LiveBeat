import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Header = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    setLoginCheck(auth.loggedIn());
  };

  useEffect(() => {
    checkLogin();
  }, []); // Run only once when the component mounts

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
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <button type="button">
                <Link to="/signup">Signup</Link>
              </button>
              <button type="button">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
