import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import useUserSettings from "hooks/useUserSettings";
import { useEffect, useRef, useState } from "react";
import { GameLevelType } from "types/game";
import useGameData from "./useGameData";

const useLevelStatus = (storedLevel: number) => {
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const [isFinished, setIsFinished] = useState(false);
  const [currentLevelStep, setCurrentLevelStep] = useState(0);
  const { userData, updateUserData } = useUserSettings();
  const { gameData, updateGameData } = useGameData();

  const decrementLives = () => {
    setLives((prev) => prev - 1);

    const newUserData = { ...userData };

    if (!newUserData.user) {
      newUserData.user = {
        lives: 3,
      };
    }

    newUserData.user.lives = newUserData.user.lives - 1;

    updateUserData(newUserData);
  };

  const handleNextLevel = async () => {
    const newData = { ...gameData };
    const thisLevel = newData[level];
    const levelProgress = thisLevel?.levelProgress || 0;

    newData[level] = {
      level: 1,
      levelProgress: levelProgress + 1,
    };

    if ((newData[level].levelProgress || 0) >= TASK_COUNT_PER_LEVEL) {
      const nextLevel = level + 1;

      if (!thisLevel) {
        newData[nextLevel.toString()] = {
          level: 1,
          levelProgress: 1,
        };
      }

      setLevel(nextLevel);
    }

    await updateGameData(newData);
  };

  const handleNextLevelStep = () => {
    const nextStep = currentLevelStep + 1;

    if (nextStep >= TASK_COUNT_PER_LEVEL) {
      handleNextLevel();
      setIsFinished(true);
      return;
    }

    setCurrentLevelStep(nextStep);
  };

  const resetLevel = () => {
    setIsFinished(false);
    setCurrentLevelStep(0);
    startTimer.current = new Date();
  };

  useEffect(() => {
    setLives(userData?.user?.lives || 3);
  }, [userData?.user?.lives]);

  useEffect(() => {
    setLevel(storedLevel);
  }, [storedLevel]);

  useEffect(() => {
    console.log("useLevelStatus useEffect userData", userData);
  }, [userData]);

  return {
    lives,
    isFinished,
    currentLevelStep,
    isLivesFinished: lives <= 0,
    startTimer: startTimer.current,
    resetLevel,
    decrementLives,
    handleNextLevelStep,
  };
};

export default useLevelStatus;
