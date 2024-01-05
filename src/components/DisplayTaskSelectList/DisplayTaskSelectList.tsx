import RoundButton from "components/RoundButton/RoundButton";
import { useCallback, useEffect, useRef, type FC } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  View,
} from "react-native";
import { type GameLevelType } from "types/game";
import { LevelScreenPropsType } from "types/screen";
import createArray from "utils/createArray";
import handleLeftMargin from "utils/handleLeftMargin";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayTaskSelectListProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  isLivesFinished: boolean;
  gameData: GameLevelType | undefined;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  navigation: {
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}

const DisplayTaskSelectList: FC<DisplayTaskSelectListProps> = ({
  gameData,
  onRefresh,
  navigation,
  handleScroll,
  isRefreshing,
  isLivesFinished,
}) => {
  const array = createArray(20);
  const flatListRef = useRef<FlatList>(null);

  const lastCompletedLevelIndex = useCallback(() => {
    for (let i = array.length - 1; i >= 0; i--) {
      const level = gameData && gameData[(i + 1).toString()];

      if (level && level.isLevelCompleted) {
        return i;
      }
    }
    return -1; // No completed levels found
  }, [gameData]);

  useEffect(() => {
    const lastIndex = lastCompletedLevelIndex();

    if (lastIndex !== -1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: lastIndex + 1,
      });
    }
  }, [lastCompletedLevelIndex]);

  return (
    <FlatList
      data={array}
      ref={flatListRef}
      getItemLayout={(_data, index) => {
        const height = scalaDownDependingOnDevice(120 + 30 + index);

        return {
          index,
          length: height,
          offset: height * index,
        };
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const isFirst = index === 0;
        const rotateAngle = index % 2 === 0 ? 10 : -10;
        const isLast = array.length - 1 === index;
        const i = (index + 1).toString();
        const level = gameData && gameData[i];
        const isSelectable = Boolean(level) || index === 0;

        return (
          <View
            id={`${index}`}
            style={{
              marginLeft: handleLeftMargin(index, 32, 5),
              marginBottom: isLast ? scalaDownDependingOnDevice(170) : 0,
              marginTop: isFirst
                ? scalaDownDependingOnDevice(25)
                : scalaDownDependingOnDevice(60),
            }}
          >
            <RoundButton
              rotateAngle={rotateAngle}
              isSelectable={isSelectable}
              title={(index + 1).toString()}
              isCompleted={level?.isLevelCompleted}
              levelProgress={level?.levelStep || 0.86}
              onPress={() => {
                if (isLivesFinished) {
                  return;
                }

                navigation.navigate("LevelScreen", {
                  paramLevel: index + 1,
                });
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default DisplayTaskSelectList;
