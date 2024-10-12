import { useState, FormEvent, ChangeEvent } from "react";
import './Login.css';

import Auth from "../utils/auth";
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      setError(true);
      setErrorMessage("Failed to login");
    }
  };

  return (
    <div className="container">
      {/* Add banner above the form */}
      <div className="banner">
        <img src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2022%2F06%2Fcoachella-festival-2023-dates-schedule-announement-1.jpg?q=75&w=800&cbr=1&fit=max" alt="Banner" />
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <div>{error && <p className="error">{errorMessage}</p>}</div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;

