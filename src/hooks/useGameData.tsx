import useAsyncStorage from "hooks/useAsyncStorage";
import { GameLevelType } from "types/game";

const useGameData = () => {
  const { data, setNewData, getData, clearData } =
    useAsyncStorage<GameLevelType>({
      key: "v1",
      initialValue: {
        "1": {
          levelStep: 0,
          // levelProgress: 0,
          isLevelCompleted: false,
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
