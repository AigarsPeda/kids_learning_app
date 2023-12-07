import { useState } from "react";

const useLives = () => {
  const [lives, setLives] = useState(3);

  const decrementLives = () => {
    setLives((prev) => prev - 1);
  };

  const incrementLives = () => {
    setLives((prev) => prev + 1);
  };

  const resetLives = () => {
    setLives(3);
  };

  return {
    lives,
    resetLives,
    decrementLives,
    incrementLives,
    isLivesFinished: lives <= 0,
  };
};

export default useLives;
