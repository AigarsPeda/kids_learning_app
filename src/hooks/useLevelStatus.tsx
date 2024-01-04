import { LEVEL_SETTINGS } from "hardcoded";
import useGameData from "hooks/useGameData";
import useUserSettings from "hooks/useUserSettings";
import { useEffect, useRef, useState } from "react";

const { levelParts, defaultLevelExperience, experienceCostForMistake } =
  LEVEL_SETTINGS;

const useLevelStatus = (storedLevel: number) => {
  const [lives, setLives] = useState(0);
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const { gameData, updateGameData } = useGameData();
  const [isFinished, setIsFinished] = useState(false);
  const { userData, isLivesFinished, updateUserData, decrementLives } =
    useUserSettings();

  const createNewLevel = (lvl: number) => {
    const newGameData = { ...gameData };
    const nextLevelData = newGameData[lvl];

    if (!nextLevelData) {
      newGameData[lvl.toString()] = {
        levelStep: 0,
        isLevelCompleted: false,
        experienceInLevel: defaultLevelExperience,
      };
    }

    updateGameData(newGameData);
  };

  const handleSavingCurrentLevelProgress = () => {
    const newData = { ...gameData };
    const step = newData[level].levelStep;
    const s = step === levelParts ? 0 : step + 1;

    // Save the current level only if it is not completed yet
    if (!newData[level].isLevelCompleted) {
      newData[level] = {
        ...newData[level],
        levelStep: s,
        isLevelCompleted: step === levelParts,
      };

      updateGameData(newData);
    }

    if (step === levelParts) {
      // add experience if level is completed to the user
      const newUserData = { ...userData };

      newUserData.user.experience =
        newUserData.user.experience + newData[level].experienceInLevel;

      updateUserData(newUserData);
      createNewLevel(level + 1);
      setIsFinished(true);
    }
  };

  const decreaseLives = () => {
    const newData = { ...gameData };

    if (!newData[level].isLevelCompleted) {
      const newExperience =
        newData[level].experienceInLevel - experienceCostForMistake;

      newData[level] = {
        ...newData[level],
        isLevelCompleted: false,
        experienceInLevel: newExperience <= 0 ? 0 : newExperience,
      };
      updateGameData(newData);
    }

    decrementLives();
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    const newGameData = { ...gameData };
    const nextLevelData = newGameData[nextLevel];

    if (!nextLevelData) createNewLevel(nextLevel);

    setLevel(nextLevel);
    setIsFinished(false);
    startTimer.current = new Date();
  };

  useEffect(() => {
    if (!userData?.user?.lives.lives) {
      return;
    }
    setLives(userData.user.lives.lives);
  }, [userData?.user?.lives?.lives]);

  useEffect(() => {
    setLevel(storedLevel);
  }, [storedLevel]);

  return {
    lives,
    isFinished,
    isLivesFinished,
    task: gameData?.[level],
    startTimer: startTimer.current,
    decreaseLives,
    handleNextLevel,
    handleSavingCurrentLevelProgress,
  };
};

export default useLevelStatus;
