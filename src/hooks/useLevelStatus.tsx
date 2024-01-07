import { LEVEL_SETTINGS } from "hardcoded";
import useGameData from "hooks/useGameData";
import { useEffect, useRef, useState } from "react";
import createNewLevel from "utils/createNewLevel";
import removeExperienceFromLevel from "utils/removeExperienceFromLevel";
import updateLevelProgress from "utils/updateLevelProgress";

const useLevelStatus = (initialLevel: number) => {
  const [level, setLevel] = useState(1);
  const startTimer = useRef<Date>(new Date());
  const { gameData, updateGameData } = useGameData();
  const [isLevelFinished, setIsLevelFinished] = useState(false);

  const handleSavingCurrentLevelProgress = () => {
    const newGameData = { ...gameData };
    const currentLevel = newGameData[level];
    const updatedLevel = updateLevelProgress(currentLevel);

    const isFirstTimeCompleted =
      !currentLevel.isLevelCompleted && updatedLevel.isLevelCompleted;

    const isCreateNextLevel =
      isFirstTimeCompleted && !Boolean(newGameData[level + 1]?.levelStep);

    // Update the user experience if the level is completed for the first time
    // if (isFirstTimeCompleted) {
    //   const newUserData = { ...userData };
    //   const { experience } = newUserData.user;

    //   updateUserData({
    //     ...newUserData,
    //     user: {
    //       ...newUserData.user,
    //       experience: experience + updatedLevel.experienceInLevel,
    //     },
    //   });
    // }

    updateGameData({
      ...newGameData,
      [level]: updatedLevel,
      ...(isCreateNextLevel && { [level + 1]: createNewLevel() }), // add next level if does not exist
    });

    setIsLevelFinished(updatedLevel.levelStep === LEVEL_SETTINGS.levelParts);
  };

  const removeExperience = () => {
    const newData = { ...gameData };

    if (!newData[level].isLevelCompleted) {
      updateGameData({
        ...newData,
        [level]: removeExperienceFromLevel(newData[level]),
      });
    }
  };

  const handleNextLevel = () => {
    const nextLevel = level + 1;
    const newGameData = { ...gameData };

    const isNextLevelExist = Boolean(newGameData[nextLevel]?.levelStep);

    if (!isNextLevelExist) {
      updateGameData({
        ...newGameData,
        [nextLevel]: createNewLevel(),
      });
    }

    setLevel(nextLevel);
    setIsLevelFinished(false);
    startTimer.current = new Date();
  };

  useEffect(() => {
    setLevel(initialLevel);
  }, [initialLevel]);

  return {
    level,
    isLevelFinished,
    task: gameData?.[level],
    startTimer: startTimer.current,
    removeExperience,
    handleNextLevel,
    handleSavingCurrentLevelProgress,
  };
};

export default useLevelStatus;
