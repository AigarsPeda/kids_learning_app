import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import DisplaySummery from "components/DisplaySummery/DisplaySummery";
import DisplayTask from "components/DisplayTask/DisplayTask";
import NoLives from "components/NoLives/NoLives";
import Progressbar from "components/Progressbar/Progressbar";
import useLevelStatus from "hooks/useLevelStatus";
import useStyles from "hooks/useStyles";
import useTasks from "hooks/useTasks";
import { type FC } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { type LevelScreenPropsType } from "types/screen";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RootStackParamList = {
  LevelScreen: LevelScreenPropsType;
};

type Props = NativeStackScreenProps<RootStackParamList, "LevelScreen">;

const LevelScreen: FC<Props> = ({ route, navigation }) => {
  const { level } = route.params;
  const { colors, typography } = useStyles();
  const { tasks, taskKind, setTaskKind } = useTasks(parseInt(level));

  const {
    lives,
    isFinished,
    startTimer,
    isLivesFinished,
    currentLevelStep,
    decrementLives,
    handleNextLevel,
    handleSavingCurrentLevelProgress,
  } = useLevelStatus(parseInt(level));

  if (isLivesFinished) {
    return (
      <NoLives
        goHome={() => {
          navigation.goBack();
        }}
      />
    );
  }

  if (isFinished) {
    return (
      <DisplaySummery
        startTimer={startTimer}
        isLivesFinished={isLivesFinished}
        handleNextLevel={handleNextLevel}
        goHome={() => {
          handleNextLevel();
          navigation.goBack();
        }}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
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
        handleSavingCurrentLevelProgress={handleSavingCurrentLevelProgress}
      />
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
