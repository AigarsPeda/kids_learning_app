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

    if (!newUserData.user) {
      newUserData.user = {
        lives: 3,
        lastUpdate: new Date(),
      };
    }

    newUserData.user.lives = newUserData.user.lives - 1;

    setLives((prev) => prev - 1);
    updateUserData(newUserData);
  };

  const handleSavingCurrentLevelStep = (step: number) => {
    const newData = { ...gameData };
    const thisLevel = newData[level];
    const nextLevel = thisLevel?.levelProgress || 0;
    const s = step === LEVEL_SETTINGS.levelParts ? 0 : step;

    newData[level] = {
      // step in witch user is
      levelStep: s,
      // how many times user has completed all steps
      levelProgress:
        step >= LEVEL_SETTINGS.levelProgress ? nextLevel + 1 : nextLevel,
    };

    setCurrentLevelStep(step);
    updateGameData(newData);

    if (step === LEVEL_SETTINGS.levelParts) {
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

    const isLevelFinished =
      currenLevel.levelProgress >= LEVEL_SETTINGS.levelParts;

    if (!isLevelFinished) {
      setIsFinished(false);
      setCurrentLevelStep(0);
      updateGameData(newGameData);
      startTimer.current = new Date();
      return;
    }

    if (!nextLevelData) {
      // create new level data if it does not exist
      newGameData[nextLevel.toString()] = {
        levelStep: 0,
        levelProgress: 0,
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
