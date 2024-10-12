import { useState, FormEvent, ChangeEvent } from "react";
import { login } from "../api/authAPI";
import Auth from "../utils/auth";

// Login component
const Login = () => {
  // State to store login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // State to store error status
  const [error, setError] = useState(false);
  // State to store error message
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
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

  // Return the login form
  return (
    <div className="authContainer">
      <h1>Login</h1>
      <form className="authForm" onSubmit={handleSubmit}>
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
        <button type="submit" className="authFormButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
