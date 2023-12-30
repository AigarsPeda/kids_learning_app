import { LEVEL_SETTINGS } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import { GameLevelType } from "types/game";

const useGameData = () => {
  const { data, setNewData, getData, clearData } =
    useAsyncStorage<GameLevelType>({
      key: "v1",
      initialValue: {
        "1": {
          levelStep: 0,
          isLevelCompleted: false,
          experienceInLevel: LEVEL_SETTINGS.defaultLevelExperience,
        },
      },
    });

  return {
    gameData: data,
    getGameData: getData,
    updateGameData: setNewData,
    removeAllGameData: clearData,
  };
};

export default useGameData;
