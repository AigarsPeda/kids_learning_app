import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import useColors from "hooks/useColors";
import useTasks from "hooks/useTasks";
import { useRef, useState, type FC } from "react";
import {
  Animated,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { device } from "utils/metrics";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const WIDTH = device.width - 50;

const initialProgressBarWidth = WIDTH * 0.05; // 5% of total width

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const { tasks, taskKind, setTaskKind } = useTasks();

  const startTimer = useRef<Date>(new Date());
  const [isFinished, setIsFinished] = useState(false);
  const [currentLevelStep, setCurrentLevelStep] = useState(0);

  const progressBarWidth = useRef(
    new Animated.Value(initialProgressBarWidth)
  ).current;

  const handleNextLevelStep = () => {
    const nextStep = currentLevelStep + 1;

    if (nextStep >= TASK_COUNT_PER_LEVEL) {
      setIsFinished(true);
      return;
    }

    // Calculate the new width
    const newWidth = (WIDTH / TASK_COUNT_PER_LEVEL) * (nextStep + 1);

    // Animate to the new width
    Animated.timing(progressBarWidth, {
      toValue: newWidth,
      duration: 500, // Duration in milliseconds
      useNativeDriver: false,
    }).start();

    setCurrentLevelStep(nextStep);
  };

  const resetLevel = () => {
    setIsFinished(false);
    setCurrentLevelStep(0);
    setTaskKind("missingNumberAddition");
    startTimer.current = new Date();

    // reset the progress bar
    Animated.timing(progressBarWidth, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

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
        <DisplaySummery
          startTimer={startTimer.current}
          resetLevel={resetLevel}
        />
      ) : (
        <>
          <View
            style={{
              height: 6,
              marginTop: 16,
              borderRadius: 8,
              width: WIDTH,
              backgroundColor: colors.accentBackground,
            }}
          >
            <Animated.View
              style={{
                height: 6,
                borderRadius: 8,
                width: progressBarWidth,
                backgroundColor: colors.accent,
              }}
            />
          </View>
          <Text
            style={{
              ...styles.headLine,
              color: colors.text,
            }}
          >
            {tasks.description}
          </Text>

          <DisplayTask
            kind={taskKind}
            tasks={tasks.tasks}
            changeTask={setTaskKind}
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
    fontWeight: "bold",
  },
});

export default HomeScreen;
