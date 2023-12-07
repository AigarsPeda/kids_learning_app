import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import Progressbar from "components/Progressbar/Progressbar";
import useLevelStatus from "hooks/useLevelStatus";
import useColors from "hooks/useStyles";
import useTasks from "hooks/useTasks";
import { type FC } from "react";

import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useLives from "hooks/useLives";
import Ionicons from "@expo/vector-icons/Ionicons";
import DisplayHeart from "../../components/DisplayHeart/DisplayHeart";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors, typography } = useColors();
  const { tasks, taskKind, setTaskKind } = useTasks();
  const { lives, decrementLives, incrementLives } = useLives();

  const {
    isFinished,
    startTimer,
    currentLevelStep,
    resetLevel,
    handleNextLevelStep,
  } = useLevelStatus();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DifferentScreen")}
      />

      {isFinished ? (
        <DisplaySummery startTimer={startTimer} resetLevel={resetLevel} />
      ) : (
        <>
          <View
            style={{
              gap: 16,
              flexDirection: "row",
              alignItems: "center",
              // backgroundColor: "#fff",
              justifyContent: "space-between",
            }}
          >
            <Progressbar currentLevelStep={currentLevelStep} />
            <DisplayHeart health={lives} />
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 19,
            }}
          >
            <Text
              style={{
                ...styles.headLine,
                color: colors.text,
                fontFamily: typography.primaryRegularFamily,
              }}
            >
              {tasks.description}
            </Text>
          </View>

          <DisplayTask
            kind={taskKind}
            tasks={tasks.tasks}
            changeTask={setTaskKind}
            decrementLives={decrementLives}
            handleNextLevelStep={handleNextLevelStep}
          />
        </>
      )}
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
    // paddingVertical: 1,
    fontWeight: "bold",
  },
});

export default HomeScreen;
