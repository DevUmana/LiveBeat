import useInterval from '../utils/interval';
import auth from '../utils/auth';

// Component to check if the user is authenticated
const AuthChecker = () => {
  // Check if the user is authenticated every second
  useInterval(() => {
    auth.redirectIfExpired();
  }, 1000);

  return null;
};

export default AuthChecker;
