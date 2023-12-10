import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import Progressbar from "components/Progressbar/Progressbar";
import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import useAsyncStorage from "hooks/useAsyncStorage";
import useLevelStatus from "hooks/useLevelStatus";
import useLives from "hooks/useLives";
import useStyles from "hooks/useStyles";
import useTasks from "hooks/useTasks";
import { type FC } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { GameLevelType } from "types/game";
import { type LevelScreenPropsType } from "types/screen";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RootStackParamList = {
  LevelScreen: LevelScreenPropsType;
};

type Props = NativeStackScreenProps<RootStackParamList, "LevelScreen">;

const LevelScreen: FC<Props> = ({ route, navigation }) => {
  const { level } = route.params;
  const { colors, typography } = useStyles();
  const { tasks, taskKind, setTaskKind } = useTasks();

  const {
    lives,
    isFinished,
    startTimer,
    isLivesFinished,
    currentLevelStep,
    resetLevel,
    decrementLives,
    handleNextLevelStep,
  } = useLevelStatus(parseInt(level));

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      {isLivesFinished || isFinished ? (
        <DisplaySummery
          startTimer={startTimer}
          isLivesFinished={isLivesFinished}
          goHome={() => navigation.goBack()}
          handleNextLevel={() => {
            // handleNextLevel();
            resetLevel();
          }}
        />
      ) : (
        <>
          <SafeAreaView
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: scalaDownDependingOnDevice(19),
            }}
          >
            <Ionicons
              name="close"
              color={colors.gray}
              onPress={() => navigation.goBack()}
              size={scalaDownDependingOnDevice(40)}
            />
            <Progressbar currentLevelStep={currentLevelStep} />
            <DisplayHeart health={lives} />
          </SafeAreaView>
          <View
            style={{
              width: "100%",
              paddingHorizontal: scalaDownDependingOnDevice(12),
            }}
          >
            <Text
              style={{
                ...styles.headLine,
                color: colors.text,
                letterSpacing: 0.5,
                fontFamily: typography.primaryMediumFont,
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
    fontWeight: "bold",
  },
});

export default LevelScreen;
