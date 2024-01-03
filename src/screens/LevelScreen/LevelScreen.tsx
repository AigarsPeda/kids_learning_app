import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BuyLives from "components/BuyLives/BuyLives";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import NoLives from "components/NoLives/NoLives";
import Progressbar from "components/Progressbar/Progressbar";
import useLevelStatus from "hooks/useLevelStatus";
import useStatusBarHeight from "hooks/useStatusBarHeight";
import useStyles from "hooks/useStyles";
import useTasks from "hooks/useTasks";
import useUserSettings from "hooks/useUserSettings";
import { type FC } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { type LevelScreenPropsType } from "types/screen";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RootStackParamList = {
  LevelScreen: LevelScreenPropsType;
};

type Props = NativeStackScreenProps<RootStackParamList, "LevelScreen">;

const LevelScreen: FC<Props> = ({ route, navigation }) => {
  const { level } = route.params;
  const { userData } = useUserSettings();
  const { colors, typography } = useStyles();
  const { statusBarHeight } = useStatusBarHeight();
  const { tasks, taskKind, getNewTasks, setTaskKind } = useTasks(
    parseInt(level)
  );

  const {
    task,
    lives,
    isFinished,
    startTimer,
    isLivesFinished,
    decreaseLives,
    handleNextLevel,
    handleSavingCurrentLevelProgress,
  } = useLevelStatus(parseInt(level));

  if (isLivesFinished) {
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          paddingTop: statusBarHeight,
          backgroundColor: colors.background,
        }}
      >
        <BuyLives userData={userData} />
        <NoLives
          goHome={() => {
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    );
  }

  if (!isFinished) {
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          paddingTop: statusBarHeight,
          backgroundColor: colors.background,
        }}
      >
        <DisplaySummery
          startTimer={startTimer}
          handleNextLevel={handleNextLevel}
          experience={task?.experienceInLevel}
          goHome={() => {
            handleNextLevel();
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: statusBarHeight,
        backgroundColor: colors.background,
      }}
    >
      <View
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
        <Progressbar currentLevelStep={task?.levelStep || 0} />
        <DisplayHeart health={lives} />
      </View>
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
        getNewTasks={getNewTasks}
        decrementLives={decreaseLives}
        handleSavingCurrentLevelProgress={handleSavingCurrentLevelProgress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headLine: {
    fontWeight: "bold",
    margin: scalaDownDependingOnDevice(16),
    fontSize: scalaDownDependingOnDevice(20),
  },
});

export default LevelScreen;
