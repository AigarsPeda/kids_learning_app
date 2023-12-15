import useAsyncStorage from "hooks/useAsyncStorage";
import { useEffect } from "react";
import { type UserSettingsType } from "types/game";
import getTimePassedSince from "utils/getTimePassedSince";

const useUserSettings = () => {
  const { data, setNewData, clearData, getData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          lives: 3,
          experience: 0,
          lastUpdate: new Date(),
        },
      },
    });

  useEffect(() => {
    if (data && data.user.lives < 3) {
      const interval = setInterval(() => {
        const { timeTillNextLife } = getTimePassedSince(data.user.lastUpdate);

        console.log("timeTillNextLife", timeTillNextLife);

        if (timeTillNextLife <= 0) {
          const newUserData = { ...data };
          newUserData.user.lives = newUserData.user.lives + 1;
          newUserData.user.lastUpdate = new Date();
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
