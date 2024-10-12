import { UserLogin } from '../interfaces/UserLogin';
import { newUser } from '../interfaces/newUser';
import Auth from '../utils/auth';

// Function to login a user
const login = async (userInfo: UserLogin) => {
  // Make a POST request to the server to login the user
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

const signUp = async (signUpData: newUser) => {
  // Make a POST request to the API
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(signUpData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error from user signup: ', err);
    return err;
  }
};

export { login, signUp };
