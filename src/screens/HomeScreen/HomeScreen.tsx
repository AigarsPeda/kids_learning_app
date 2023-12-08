import RoundButton from "components/RoundButton/RoundButton";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { type LevelScreenPropsType } from "types/screen";
import handleLeftMargin from "utils/handleLeftMargin";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LevelScreenProps {
  navigation: {
    // navigate: (arg0: string, arg1: { otherParam: string }) => void;
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}

const HomeScreen: FC<LevelScreenProps> = ({ navigation }) => {
  const { colors } = useStyles();

  const createArray = (length: number) => [...Array(length)];

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        data={createArray(20)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isFirst = index === 0;

          return (
            <View
              style={{
                marginLeft: handleLeftMargin(index, 32, 5),
                marginTop: isFirst ? 0 : scalaDownDependingOnDevice(105),
              }}
            >
              <RoundButton
                title={(index + 1).toString()}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollView: {
    gap: 20,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
  },
  headLine: {
    margin: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
