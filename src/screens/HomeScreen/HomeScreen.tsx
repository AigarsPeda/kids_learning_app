import DisplayTask from "components/DisplayTask/DisplayTask";
import MyButton from "components/MyButton/MyButton";
import useColors from "hooks/useColors";
import React, {
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
  type FC,
} from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MATH_TASKS, MATH_TASK_EXPLANATION } from "tasks/math";
import {
  MathObjKeysType,
  MissingNumberTaskType,
  TaskKindType,
} from "types/addition";
import getRandomTask from "utils/getRandomTask";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const [tasks, setTasks] = useState<{
    description: string;
    tasks: MissingNumberTaskType[];
  }>({
    tasks: [],
    description: "No description",
  });

  const taskRefs = useRef<RefObject<TextInput>[]>([]);

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

  useEffect(() => {
    const t = findTasks(level, taskKind);
    // Create refs for the new tasks
    taskRefs.current = t.tasks.map(
      (_, i) => taskRefs.current[i] || createRef<TextInput>()
    );
    // Then update the tasks state
    setTasks(t);
  }, [level, taskKind]);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
      // onTouchStart={() => {
      //   console.log("onTouchStart");

      //   Keyboard.dismiss();
      //   taskRefs.current[0]?.current?.focus();
      // }}
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
          const taskRef = taskRefs.current[index];

          return (
            <DisplayTask
              task={item}
              ref={taskRef}
              kind={taskKind}
              sequenceNumber={index}
            />
          );
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingBottom: scalaDownDependingOnDevice(25),
          }}
        >
          <MyButton
            title="Nākamais"
            onPress={() => {
              setTaskKind("missingNumber");
            }}
          />
        </View>
      </KeyboardAvoidingView>
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
