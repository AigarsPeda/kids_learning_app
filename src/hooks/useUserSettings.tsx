import { LEVEL_SETTINGS } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import { useEffect } from "react";
import { type UserSettingsType } from "types/game";
import isMinutesPassed from "utils/isMinutesPassed";

const useUserSettings = () => {
  const { data, setNewData, clearData, getData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          lives: 3,
          lastUpdate: new Date(),
          experience: 0,
        },
      },
    });

  useEffect(() => {
    if (data && data.user.lives < 3) {
      if (
        isMinutesPassed({
          startDate: data.user.lastUpdate,
          minutes: LEVEL_SETTINGS.livesRecoveryTimeInMinutes,
        })
      ) {
        const newUserData = { ...data };
        newUserData.user.lives = 3;
        newUserData.user.lastUpdate = new Date();
        setNewData(newUserData);
      }
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
