import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import { useEffect, useRef, useState } from "react";
import useAsyncStorage from "hooks/useAsyncStorage";
import { GameLevelType, UserSettingsType } from "types/game";

const useLevelStatus = (storedLevel: number) => {
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1); // ["1", "2", "3", "4", "5"
  const startTimer = useRef<Date>(new Date());
  const [isFinished, setIsFinished] = useState(false);
  const [currentLevelStep, setCurrentLevelStep] = useState(0);

  const { data: userData, setNewData: updateUserData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          lives: 3,
        },
      },
    });

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

  const { data, setNewData } = useAsyncStorage<GameLevelType>({
    key: "v1",
  });

  const handleNextLevel = async () => {
    const newData = { ...data };
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

    console.log("newData --->>>", newData);

    await setNewData(newData);
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
    isFinished,
    currentLevelStep,
    startTimer: startTimer.current,
    resetLevel,
    handleNextLevelStep,
    lives,
    // incrementLevel,
    isLivesFinished: lives <= 0,
    decrementLives,
  };
};

export default useLevelStatus;
