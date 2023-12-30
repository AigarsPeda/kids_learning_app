import { useState, useEffect } from "react";

const useTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  useEffect(() => {
    // Component mounted, start the timer
    const start = Date.now();
    setStartTime(start);

    // Component will unmount, return the elapsed time
    return () => {
      if (startTime) {
        const end = Date.now();
        const elapsed = Math.floor((end - startTime) / 1000); // Convert milliseconds to seconds
        setElapsedTime(elapsed);
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return elapsedTime;
};

export default useTimer;
