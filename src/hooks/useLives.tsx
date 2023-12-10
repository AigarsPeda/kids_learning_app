import { useEffect, useState } from "react";

const useLives = (storedLives: number) => {
  const [lives, setLives] = useState(3);

  const decrementLives = () => {
    setLives((prev) => prev - 1);
  };

  const incrementLives = () => {
    setLives((prev) => prev + 1);
  };

  useEffect(() => {
    setLives(storedLives);
  }, [storedLives]);

  // const resetLives = (num: number) => {
  //   setLives(num);
  // };

  return {
    lives,
    // resetLives,
    // resetLives,
    decrementLives,
    incrementLives,
    isLivesFinished: lives <= 0,
  };
};

export default useLives;
