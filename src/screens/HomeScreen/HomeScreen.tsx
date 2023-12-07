import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import Progressbar from "components/Progressbar/Progressbar";
import useColors from "hooks/useStyles";
import useLevelStatus from "hooks/useLevelStatus";
import useTasks from "hooks/useTasks";
import { type FC } from "react";

import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors, typography } = useColors();
  const { tasks, taskKind, setTaskKind } = useTasks();

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
          <Progressbar currentLevelStep={currentLevelStep} />

          <Text
            style={{
              ...styles.headLine,
              color: colors.text,
              fontFamily: typography.primaryRegularFamily,
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
    paddingVertical: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
