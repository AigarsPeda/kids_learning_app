import { useFocusEffect } from "@react-navigation/native";
import DisplayTaskSelectList from "components/DisplayTaskSelectList/DisplayTaskSelectList";
import HomeHeader from "components/HomeHeader/HomeHeader";
import useGameData from "hooks/useGameData";
import useStyles from "hooks/useStyles";
import useUserSettings from "hooks/useUserSettings";
import { useCallback, useEffect, useState, type FC } from "react";
import { SafeAreaView, View } from "react-native";
import { type LevelScreenPropsType } from "types/screen";

interface LevelScreenProps {
  navigation: {
    push: (arg0: string) => void;
    addListener: (arg0: string, arg1: () => void) => void;
    removeListener: (arg0: string, arg1: () => void) => void;
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}

const HomeScreen: FC<LevelScreenProps> = ({ navigation }) => {
  const { colors } = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { getUserData, removeAllUserData } = useUserSettings();
  const { gameData, getGameData, removeAllGameData } = useGameData();

  // const isLivesFinished = userData?.user.lives.lives === 0;

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      getGameData();
      getUserData();
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // removeAllGameData();
      // removeAllUserData()
      // getUserData();
      getGameData();
    }, [])
  );

  useEffect(() => {
    console.log("gameData", gameData);
  }, [gameData]);

  const KEY_ARRAY = ["NR", "FOO", "BAR"];

  const OBJ_ARRAY = [
    {
      FOO: "FOO",
      BAR: "BAR",
      NR: "NR",
    },
    {
      BAR: "BAR",
      NR: "NR",
      FOO: "FOO",
    },
    {
      FOO: "FOO",
      NR: "NR",
      BAR: "BAR",
    },
  ];

  const sortObjKeysByArray = (
    array: string[],
    objArray: {
      [key: string]: unknown;
    }[]
  ) => {
    const sorted = objArray.map((obj) => {
      const newObj: {
        [key: string]: unknown;
      } = {};
      array.forEach((key) => {
        newObj[key] = obj[key];
      });
      return newObj;
    });
    return sorted;
  };

  // Sort object keys by array

  console.log("sorted", sortObjKeysByArray(KEY_ARRAY, OBJ_ARRAY));

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
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
        <HomeHeader />
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DisplayTaskSelectList
          gameData={gameData}
          onRefresh={onRefresh}
          navigation={navigation}
          isRefreshing={isRefreshing}
          handleScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            // Check the value of offsetY to determine if the FlatList is scrolled
            if (offsetY > 0) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
