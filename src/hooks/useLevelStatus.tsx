import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import { useRef, useState } from "react";

const useLevelStatus = () => {
  const startTimer = useRef<Date>(new Date());
  const [isFinished, setIsFinished] = useState(false);
  const [currentLevelStep, setCurrentLevelStep] = useState(0);

  const handleNextLevelStep = () => {
    const nextStep = currentLevelStep + 1;

    if (nextStep >= TASK_COUNT_PER_LEVEL) {
      setIsFinished(true);
      return;
    }

    setCurrentLevelStep(nextStep);
  };

  const resetLevel = () => {
    setIsFinished(false);
    setCurrentLevelStep(0);
    // setTaskKind("missingNumberAddition");
    startTimer.current = new Date();
  };

  return {
    isFinished,
    currentLevelStep,
    startTimer: startTimer.current,
    resetLevel,
    handleNextLevelStep,
  };
};

export default useLevelStatus;
