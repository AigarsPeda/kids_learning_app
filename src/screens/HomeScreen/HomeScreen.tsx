import { useFocusEffect } from "@react-navigation/native";
import HomeHeader from "components/HomeHeader/HomeHeader";
import RoundButton from "components/RoundButton/RoundButton";
import useGameData from "hooks/useGameData";
import useStyles from "hooks/useStyles";
import useUserSettings from "hooks/useUserSettings";
import { useCallback, useEffect, useState, type FC } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import { type LevelScreenPropsType } from "types/screen";
import handleLeftMargin from "utils/handleLeftMargin";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LevelScreenProps {
  navigation: {
    addListener: (arg0: string, arg1: () => void) => void;
    removeListener: (arg0: string, arg1: () => void) => void;
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}

const HomeScreen: FC<LevelScreenProps> = ({ navigation }) => {
  const { colors } = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { gameData, getGameData, removeAllGameData } = useGameData();
  const { userData, getUserData, removeAllUserData } = useUserSettings();

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      getGameData();
      getUserData();
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const createArray = (length: number) => [...Array(length)];

  const array = createArray(20);

  useFocusEffect(
    useCallback(() => {
      // removeAllGameData();
      getUserData();
      getGameData();
    }, [])
  );

  useEffect(() => {
    console.log("userData", userData);
    console.log("gameData", gameData);
  }, [gameData, userData]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        marginTop: StatusBar.currentHeight || 0,
      }}
    >
      <View
        style={{
          padding: 16,
          width: "100%",
          elevation: 15,
          shadowRadius: 2,
          shadowColor: colors.lightGray,
          backgroundColor: colors.background,
          shadowOpacity: isScrolled ? 0.3 : 0,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <HomeHeader userData={userData} />
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={array}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            // Check the value of offsetY to determine if the FlatList is scrolled
            if (offsetY > 0) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          }}
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
                style={{
                  marginLeft: handleLeftMargin(index, 32, 5),
                  marginTop: isFirst
                    ? scalaDownDependingOnDevice(25)
                    : scalaDownDependingOnDevice(60),
                  marginBottom: isLast ? scalaDownDependingOnDevice(170) : 0,
                }}
              >
                <RoundButton
                  rotateAngle={rotateAngle}
                  isSelectable={isSelectable}
                  title={(index + 1).toString()}
                  isCompleted={level?.isLevelCompleted}
                  levelProgress={level?.levelStep || 0.86}
                  onPress={() =>
                    navigation.navigate("LevelScreen", {
                      level: (index + 1).toString(),
                    })
                  }
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
