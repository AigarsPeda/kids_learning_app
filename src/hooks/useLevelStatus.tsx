import { LEVEL_SETTINGS } from "hardcoded";
import useGameData from "hooks/useGameData";
import useUserSettings from "hooks/useUserSettings";
import { useEffect, useRef, useState } from "react";
import createNewLevel from "utils/createNewLevel";
import removeExperienceFromLevel from "utils/removeExperienceFromLevel";

const { levelParts } = LEVEL_SETTINGS;

const useLevelStatus = (storedLevel: number) => {
  const [lives, setLives] = useState(0);
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const { gameData, updateGameData } = useGameData();
  const [isFinished, setIsFinished] = useState(false);
  const { userData, isLivesFinished, updateUserData, decrementLives } =
    useUserSettings();

  const handleSavingCurrentLevelProgress = () => {
    const newGameData = { ...gameData };
    const step = newGameData[level].levelStep;
    const s = step === levelParts ? 0 : step + 1;

    // Save the current level only if it is not completed yet
    if (!newGameData[level].isLevelCompleted) {
      newGameData[level] = {
        ...newGameData[level],
        levelStep: s,
        isLevelCompleted: step === levelParts,
      };

      updateGameData(newGameData);
    }

    // If the level is completed, then update the user experience
    if (step === levelParts) {
      const newUserData = { ...userData };
      const user = newUserData.user;

      user.experience = user.experience + newGameData[level].experienceInLevel;

      setIsFinished(true);
      updateUserData(newUserData);
      updateGameData({
        ...newGameData,
        ...createNewLevel(level + 1),
      });
    }
  };

  const decreaseLives = () => {
    const newData = { ...gameData };

    if (!newData[level].isLevelCompleted) {
      updateGameData({
        ...newData,
        ...removeExperienceFromLevel(level, newData[level]),
      });
    }

    decrementLives();
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    const newGameData = { ...gameData };
    const nextLevelData = newGameData[nextLevel];

    if (!nextLevelData)
      updateGameData({
        ...newGameData,
        ...createNewLevel(nextLevel),
      });

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
