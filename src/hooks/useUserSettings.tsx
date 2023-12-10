import useAsyncStorage from "hooks/useAsyncStorage";
import { UserSettingsType } from "types/game";

const useUserSettings = () => {
  const { data, setNewData, clearData } = useAsyncStorage<UserSettingsType>({
    key: "v1_user",
    initialValue: {
      user: {
        lives: 3,
      },
    },
  });

  return {
    userData: data,
    clearUserData: clearData,
    updateUserData: setNewData,
  };
};

export default useUserSettings;
