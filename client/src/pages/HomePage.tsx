import { useState, useLayoutEffect, useEffect } from "react";
import UpcomingEvents from "../components/UpcomingEvents";
import SearchEvent from "../components/SearchEvent";
import AuthChecker from "../components/AuthChecker";
import Hotels from "../components/Hotels";
import auth from "../utils/auth";

const HomePage = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <>
      <AuthChecker />
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to search events near you!</h1>
        </div>
      ) : (
        <>
          <UpcomingEvents />
          <SearchEvent city={setSelectedCity} />
          {selectedCity && <Hotels city={selectedCity} />}
        </>
      )}
    </>
  );
};

export default HomePage;
