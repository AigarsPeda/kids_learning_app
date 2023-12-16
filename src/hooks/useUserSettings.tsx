import useAsyncStorage from "hooks/useAsyncStorage";
import { useEffect } from "react";
import { type UserSettingsType } from "types/game";
import getTimePassedSince from "utils/getTimePassedSince";
import { LEVEL_SETTINGS } from "../hardcoded";

const useUserSettings = () => {
  const { data, setNewData, clearData, getData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          lastUpdate: new Date(),
          lives: LEVEL_SETTINGS.defaultLives,
          experience: 0,
        },
      },
    });

  useEffect(() => {
    if (data && data.user.lives < 3) {
      const { lives, lastUpdate } = data.user;

      const interval = setInterval(() => {
        const { timeTillNextLife } = getTimePassedSince(lastUpdate);

        console.log("timeTillNextLife", timeTillNextLife);

        if (timeTillNextLife <= 0) {
          const newUserData = { ...data };

          newUserData.user.lives = newUserData.user.lives + 1;
          newUserData.user.lastUpdate = new Date();

          // newUserData.user.lives = {
          //   current: current + 1,
          //   lastUpdate: new Date(),
          // };
          setNewData(newUserData);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  return {
    userData: data,
    getUserData: getData,
    updateUserData: setNewData,
    removeAllUserData: clearData,
  };
};

export default useUserSettings;
