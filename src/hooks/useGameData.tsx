import useAsyncStorage from "hooks/useAsyncStorage";
import { GameLevelType } from "types/game";

const useGameData = () => {
  const { data, setNewData, getData } = useAsyncStorage<GameLevelType>({
    key: "v1",
    initialValue: {},
  });

  return {
    gameData: data,
    getGameData: getData,
    updateGameData: setNewData,
  };
};

export default useGameData;
