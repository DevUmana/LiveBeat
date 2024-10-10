import { useState, FormEvent, ChangeEvent } from "react";
import { signUp } from "../api/signupAPI";
import { UserLogin } from "../interfaces/UserLogin";
import { login } from "../api/authAPI";
import AuthService from "../utils/auth";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!signUpData.username || !signUpData.email || !signUpData.password) {
            setErrorMessage("Please fill out all fields");
            return;
        }

        try {
            const data = await signUp(signUpData);
            console.log(data);
            setErrorMessage("User created successfully");
            const userInfo: UserLogin = { username: signUpData.username, password: signUpData.password }
            try {
                const data = await login(userInfo);
                console.log(data);
                AuthService.login(data.token);
                window.location.assign("/");
            } catch (err) {
                console.error("Failed to login", err);
                setErrorMessage("Failed to login");
            }
        } catch (err) {
            console.error("Failed to sign up", err);
            setErrorMessage("Failed to sign up");
        }
    };

    return (
        <div className='container'>
            <form className='form'
            onSubmit={handleSubmit}>
                <h1>Create A New Account</h1>
                <label>Username</label>
                <input
                    type='text'
                    name='username'
                    value={signUpData.username || ''}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    value={signUpData.email || ''}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={signUpData.password || ''}
                    onChange={handleChange}
                />
                <p className='error'>{errorMessage}</p>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default SignUp;