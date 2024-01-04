import useGameData from "hooks/useGameData";
import useUserSettings from "hooks/useUserSettings";
import { useEffect, useRef, useState } from "react";
import createNewLevel from "utils/createNewLevel";
import removeExperienceFromLevel from "utils/removeExperienceFromLevel";
import updateLevelProgress from "utils/updateLevelProgress";

const useLevelStatus = (initialLevel: number) => {
  const [lives, setLives] = useState(0);
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const { gameData, updateGameData } = useGameData();
  const [isFinished, setIsFinished] = useState(false);
  const { userData, isLivesFinished, updateUserData, decrementLives } =
    useUserSettings();

  const handleSavingCurrentLevelProgress = () => {
    const newGameData = { ...gameData };
    const updatedLevel = updateLevelProgress(newGameData[level]);

    // Save the current level only if it is not completed yet
    if (!updatedLevel.isLevelCompleted) {
      updateGameData({
        ...newGameData,
        [level]: updatedLevel,
      });
    }

    // If the level is completed, then update the user experience and create a new level
    if (updatedLevel.isLevelCompleted) {
      const newUserData = { ...userData };
      const user = newUserData.user;

      user.experience = user.experience + updatedLevel.experienceInLevel;

      setIsFinished(true);
      updateUserData(newUserData);
      updateGameData({
        ...newGameData,
        [level + 1]: createNewLevel(),
      });
    }
  };

  const decreaseLives = () => {
    const newData = { ...gameData };

    if (!newData[level].isLevelCompleted) {
      updateGameData({
        ...newData,
        [level]: removeExperienceFromLevel(newData[level]),
      });
    }

    decrementLives();
  };
  1;

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    const newGameData = { ...gameData };
    const nextLevelData = newGameData[nextLevel];

    if (!nextLevelData)
      updateGameData({
        ...newGameData,
        [nextLevel]: createNewLevel(),
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
    setLevel(initialLevel);
  }, [initialLevel]);

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
