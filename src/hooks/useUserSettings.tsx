import { LEVEL_SETTINGS } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import { useCallback, useEffect, useState } from "react";
import { type UserSettingsType } from "types/game";
import getTimePassedSince from "utils/getTimePassedSince";

const useUserSettings = () => {
  const [isLivesFinished, setIsLivesFinished] = useState(false);

  const { data, setNewData, clearData, getData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          experience: 0,
          lives: {
            lastUpdate: new Date(),
            lives: LEVEL_SETTINGS.defaultLives,
          },
        },
      },
    });

  const decrementLives = () => {
    const newUserData = { ...data };

    newUserData.user.lives = {
      lives: newUserData.user.lives.lives - 1,
      lastUpdate: new Date(),
    };

    setNewData(newUserData);
  };

  const incrementLives = useCallback(() => {
    const newUserData = { ...data };

    newUserData.user.lives = {
      lives: newUserData.user.lives.lives + 1,
      lastUpdate: new Date(),
    };

    setNewData(newUserData);
  }, [data]);

  const buyLivesUsingExperience = () => {
    const newUserData = { ...data };

    newUserData.user.experience -= LEVEL_SETTINGS.buyLivesWithExperience;
    newUserData.user.lives = {
      lastUpdate: new Date(),
      lives: newUserData.user.lives.lives + 1,
    };

    setNewData(newUserData);
    setIsLivesFinished(false);
  };

  useEffect(() => {
    if (data && data.user.lives.lives < 3) {
      const { lastUpdate } = data.user.lives;

      const interval = setInterval(() => {
        const { timeTillNextLife } = getTimePassedSince(
          lastUpdate,
          LEVEL_SETTINGS.livesRecoveryTimeInMinutes
        );

        console.log("timeTillNextLife", timeTillNextLife);

        if (timeTillNextLife <= 0) {
          incrementLives();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data, incrementLives]);

  useEffect(() => {
    if (data?.user.lives.lives === 0) {
      setIsLivesFinished(true);
    } else {
      setIsLivesFinished(false);
    }
  }, [data?.user.lives.lives]);

  return {
    userData: data,
    decrementLives,
    isLivesFinished,
    getUserData: getData,
    buyLivesUsingExperience,
    updateUserData: setNewData,
    removeAllUserData: clearData,
  };
};

export default useUserSettings;
