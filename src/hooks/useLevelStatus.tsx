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
    const currentLevel = newGameData[level];

    const updatedLevel = updateLevelProgress(currentLevel);

    const isFirstTimeCompleted =
      !currentLevel.isLevelCompleted && updatedLevel.isLevelCompleted;

    const isAddNextLevel =
      isFirstTimeCompleted && !Boolean(newGameData[level + 1]?.levelStep);

    // Update the user experience if the level is completed for the first time
    if (isFirstTimeCompleted) {
      const newUserData = { ...userData };
      let { experience } = newUserData.user;

      updateUserData({
        ...newUserData,
        user: {
          ...newUserData.user,
          experience: experience + updatedLevel.experienceInLevel,
        },
      });
    }

    updateGameData({
      ...newGameData,
      [level]: updatedLevel,
      ...(isAddNextLevel && { [level + 1]: createNewLevel() }), // add next level if does not exist
    });

    setIsFinished(isFirstTimeCompleted);
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
