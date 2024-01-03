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
  const { userData, isLivesFinished, updateUserData, decrementLives } =
    useUserSettings();

  const createNextLevel = (level: number) => {
    // const nextLevel = level + 1;
    const newGameData = { ...gameData };
    const nextLevelData = newGameData[level];

    if (!nextLevelData) {
      // create new level data if it does not exist
      newGameData[level.toString()] = {
        levelStep: 0,
        isLevelCompleted: false,
        experienceInLevel: LEVEL_SETTINGS.defaultLevelExperience,
      };
    }

    // setLevel(nextLevel);
    // setIsFinished(false);
    updateGameData(newGameData);
    // startTimer.current = new Date();
  };

  const handleSavingCurrentLevelProgress = () => {
    const newData = { ...gameData };
    const nextStep = newData[level].levelStep;
    const s = nextStep === LEVEL_SETTINGS.levelParts ? 0 : nextStep + 1;

    // Save the current level only if it is not completed yet
    if (!newData[level].isLevelCompleted) {
      newData[level] = {
        ...newData[level],
        levelStep: s,
        isLevelCompleted: nextStep === LEVEL_SETTINGS.levelParts,
      };

      updateGameData(newData);
    }

    console.log("nextStep", nextStep);
    console.log("LEVEL_SETTINGS.levelParts", LEVEL_SETTINGS.levelParts);

    if (nextStep === LEVEL_SETTINGS.levelParts) {
      // add experience if level is completed to the user
      const newUserData = { ...userData };

      newUserData.user.experience =
        newUserData.user.experience + newData[level].experienceInLevel;

      updateUserData(newUserData);
      createNextLevel(level + 1);
      setIsFinished(true);
    }
  };

  const decreaseLives = () => {
    const newData = { ...gameData };

    if (!newData[level].isLevelCompleted) {
      const newExperience =
        newData[level].experienceInLevel -
        LEVEL_SETTINGS.experienceCostForMistake;

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
    // const currenLevel = newGameData[level];
    const nextLevelData = newGameData[nextLevel];

    // if (!currenLevel.isLevelCompleted) {
    //   setIsFinished(false);
    //   updateGameData(newGameData);
    //   startTimer.current = new Date();
    //   return;
    // }

    if (!nextLevelData) {
      createNextLevel(nextLevel);
      console.log("create new level");
      // create new level data if it does not exist
      // newGameData[nextLevel.toString()] = {
      //   levelStep: 0,
      //   isLevelCompleted: false,
      //   experienceInLevel: LEVEL_SETTINGS.defaultLevelExperience,
      // };
    }

    console.log("nextLevelData", nextLevelData);

    setLevel(nextLevel);
    setIsFinished(false);
    // updateGameData(newGameData);
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
