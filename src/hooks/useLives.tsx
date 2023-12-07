import { useState } from "react";

const useLives = () => {
  const [lives, setLives] = useState(3);

  const decrementLives = () => {
    setLives((prev) => prev - 1);
  };

  const incrementLives = () => {
    setLives((prev) => prev + 1);
  };

  return {
    lives,
    decrementLives,
    incrementLives,
  };
};

export default useLives;
