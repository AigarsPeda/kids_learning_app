import DisplayTask from "components/DisplayTask/DisplayTask";
import useColors from "hooks/useColors";
import { useState, type FC, useRef, useEffect } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { MATH_TASKS, MATH_TASK_EXPLANATION } from "tasks/math";
import {
  MathObjKeysType,
  MissingNumberTaskType,
  TaskKindType,
} from "types/addition";
import getRandomTask from "utils/getRandomTask";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const inputRef = useRef<TextInput>(null);
  // const inputRef = useRef<TextInput>(null);
  const [tasks, setTasks] = useState<{
    description: string;
    tasks: MissingNumberTaskType[];
  }>({
    description: "No description",
    tasks: [],
  });
  const [level, setLevel] = useState<MathObjKeysType>("easy");
  const [taskKind, setTaskKind] = useState<TaskKindType>("missingNumber"); // "missingNumber" | "addition" | "subtraction" | "multiplication" | "division"

  const findTasks = (lev: MathObjKeysType, taskK: TaskKindType) => {
    switch (lev) {
      case "easy":
        return {
          description: MATH_TASK_EXPLANATION[taskK],
          tasks: getRandomTask({
            countOfItems: 3,
            allItems: MATH_TASKS.easy[taskK].tasks,
          }),
        };

      //   // case "medium":
      //   //   return MATH_TASKS.medium.tasks;
      default:
        return {
          description: "No description",
          tasks: getRandomTask({
            countOfItems: 3,
            allItems: MATH_TASKS.easy[taskK].tasks,
          }),
        };
    }
  };

  const ref = useRef<SafeAreaView>(null);

  useEffect(() => {
    setTasks(findTasks(level, taskKind));
  }, [level, taskKind]);

  useEffect(() => {
    if (tasks.tasks.length > 0) {
      console.log("inputRef.current.focus()");
      inputRef.current?.focus();
    }
  }, [tasks]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
      ref={ref}
      onTouchStart={() => {
        console.log("onTouchStart");
      }}
    >
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DifferentScreen")}
      />
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
        }}
      >
        {tasks.description}
      </Text>
      <FlatList
        data={tasks.tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <DisplayTask task={item} kind={taskKind} sequenceNumber={index} />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headLine: {
    margin: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
