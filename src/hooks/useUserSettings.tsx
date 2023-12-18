import { LEVEL_SETTINGS } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import { useCallback, useEffect } from "react";
import { type UserSettingsType } from "types/game";
import getTimePassedSince from "utils/getTimePassedSince";

const useUserSettings = () => {
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

    // newUserData.user.lives = newUserData.user.lives - 1;
    // newUserData.user.lastUpdate = new Date();

    newUserData.user.lives = {
      lives: newUserData.user.lives.lives - 1,
      lastUpdate: new Date(),
    };

    setNewData(newUserData);
  };

  const incrementLives = useCallback(() => {
    const newUserData = { ...data };

    // newUserData.user.lives = newUserData.user.lives + 1;
    // newUserData.user.lastUpdate = new Date();

    newUserData.user.lives = {
      lives: newUserData.user.lives.lives + 1,
      lastUpdate: new Date(),
    };

    setNewData(newUserData);
  }, [data]);

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

  return {
    userData: data,
    decrementLives,
    getUserData: getData,
    updateUserData: setNewData,
    removeAllUserData: clearData,
  };
};

export default useUserSettings;
