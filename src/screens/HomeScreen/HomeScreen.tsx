import MyButton from "components/MyButton/MyButton";
import useStyles from "hooks/useStyles";
import { FC } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { type LevelScreenPropsType } from "types/screen";

interface LevelScreenProps {
  navigation: {
    // navigate: (arg0: string, arg1: { otherParam: string }) => void;
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}
//LevelScreenPropsType
const HomeScreen: FC<LevelScreenProps> = ({ navigation }) => {
  const { colors, typography } = useStyles();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.container}>
        {/* <Text>HomeScreen</Text> */}
        <MyButton
          title="Go to level 1"
          onPress={() =>
            navigation.navigate("LevelScreen", {
              level: "anything you want here",
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  headLine: {
    margin: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
