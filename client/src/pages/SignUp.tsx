import { useState, FormEvent, ChangeEvent } from "react";
import { UserLogin } from "../interfaces/UserLogin";
import { login, signUp } from "../api/authAPI";
import AuthService from "../utils/auth";

// SignUp component
const SignUp = () => {
  // State to store sign up data
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to store error message
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await signUp(signUpData);
      if (data instanceof Error) {
        setErrorMessage(data?.message);
        return;
      }
      console.log(data);
      setErrorMessage(data?.message || "Failed to sign up");
      try {
        const userInfo: UserLogin = {
          username: signUpData.username,
          password: signUpData.password,
        };
        const data = await login(userInfo);
        console.log(data);
        AuthService.login(data.token);
        window.location.assign("/");
      } catch (err) {
        console.error("Failed to login", err);
        setErrorMessage(`${err}`);
      }
    } catch (err) {
      console.error("Failed to sign up", err);
      setErrorMessage(`${err}`);
    }
  };

  // Return the sign up form
  return (
    <div className="authContainer">
      <h1>Create A New Account</h1>
      <form className="authForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={signUpData.username || ""}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={signUpData.email || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={signUpData.password || ""}
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={signUpData.confirmPassword || ""}
          onChange={handleChange}
        />
        <p className="error">{errorMessage}</p>
        <button type="submit" className="authFormButton">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
