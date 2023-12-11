import useAsyncStorage from "hooks/useAsyncStorage";
import { useEffect } from "react";
import { UserSettingsType } from "types/game";
import isHoursPassed from "utils/isHoursPassed";

const useUserSettings = () => {
  const { data, setNewData, clearData, getData } =
    useAsyncStorage<UserSettingsType>({
      key: "v1_user",
      initialValue: {
        user: {
          lives: 3,
          lastUpdate: new Date(),
        },
      },
    });

  useEffect(() => {
    if (data && data.user.lives < 3) {
      if (
        isHoursPassed({
          hours: 2,
          startDate: data.user.lastUpdate,
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
