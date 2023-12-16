import { LEVEL_SETTINGS } from "hardcoded";
import useGameData from "hooks/useGameData";
import useUserSettings from "hooks/useUserSettings";
import { useEffect, useRef, useState } from "react";

const useLevelStatus = (storedLevel: number) => {
  const [lives, setLives] = useState(0);
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const { gameData, updateGameData } = useGameData();
  const [isFinished, setIsFinished] = useState(false);
  const { userData, updateUserData } = useUserSettings();
  const [currentLevelStep, setCurrentLevelStep] = useState(0);

  const decrementLives = () => {
    const newUserData = { ...userData };

    newUserData.user.lives = newUserData.user.lives - 1;
    newUserData.user.lastUpdate = new Date();

    setLives((prev) => prev - 1);
    updateUserData(newUserData);
  };

  const handleSavingCurrentLevelStep = (step: number) => {
    const newData = { ...gameData };
    const s = step === LEVEL_SETTINGS.levelParts ? 0 : step;

    // Save the current level only if it is not completed yet
    if (!newData[level].isLevelCompleted) {
      newData[level] = {
        // step in witch user is
        levelStep: s,
        isLevelCompleted: step === LEVEL_SETTINGS.levelParts,
      };

      updateGameData(newData);
    }

    setCurrentLevelStep(step);

    if (step === LEVEL_SETTINGS.levelParts) {
      // add experience if level is completed to the user
      const newUserData = { ...userData };

      newUserData.user.experience =
        newUserData.user.experience + LEVEL_SETTINGS.experiencePerLevel;

      updateUserData(newUserData);
      setIsFinished(true);
    }
  };

  const handleCurrentLevelStep = () => {
    const nextStep = currentLevelStep + 1;
    handleSavingCurrentLevelStep(nextStep);
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    const newGameData = { ...gameData };
    const currenLevel = newGameData[level];
    const nextLevelData = newGameData[nextLevel];

    // const isLevelFinished = currenLevel.levelStep >= LEVEL_SETTINGS.levelParts;

    if (!currenLevel.isLevelCompleted) {
      setIsFinished(false);
      setCurrentLevelStep(0);
      updateGameData(newGameData);
      startTimer.current = new Date();
      return;
    }

    // add experience if level is completed to the user
    // const newUserData = { ...userData };

    if (!nextLevelData) {
      // create new level data if it does not exist
      newGameData[nextLevel.toString()] = {
        levelStep: 0,
        isLevelCompleted: false,
      };
    }

    setLevel(nextLevel);
    setIsFinished(false);
    setCurrentLevelStep(0);
    updateGameData(newGameData);
    startTimer.current = new Date();
  };

  useEffect(() => {
    const thisLevel = gameData?.[level];

    if (!thisLevel) {
      return;
    }

    setCurrentLevelStep(thisLevel.levelStep);
  }, [gameData, level]);

  useEffect(() => {
    if (!userData?.user?.lives) {
      return;
    }
    setLives(userData.user.lives);
  }, [userData?.user?.lives]);

  useEffect(() => {
    setLevel(storedLevel);
  }, [storedLevel]);

  return {
    lives,
    isFinished,
    currentLevelStep,
    isLivesFinished: lives <= 0,
    startTimer: startTimer.current,
    decrementLives,
    handleNextLevel,
    handleCurrentLevelStep,
  };
};

export default useLevelStatus;
