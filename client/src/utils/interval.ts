import { useEffect } from 'react';

// Custom hook to handle intervals
const useInterval = (callback: () => void, delay: number) => {
  // Set interval on component mount and clear on unmount or delay change
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
};

export default useInterval;
