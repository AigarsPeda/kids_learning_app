import DisplayTask from "components/DisplayTask/DisplayTask";
import useColors from "hooks/useColors";
import { useState, type FC } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MATH_TASKS } from "tasks/math";
import { MathObjKeysType, TaskKindType } from "types/addition";
import getRandomTask from "utils/getRandomTask";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const [level, setLevel] = useState<MathObjKeysType>("easy");
  const [taskKind, setTaskKind] = useState<TaskKindType>("missingNumber"); // "missingNumber" | "addition" | "subtraction" | "multiplication" | "division"

  const findTasks = (lev: MathObjKeysType, taskK: TaskKindType) => {
    switch (lev) {
      case "easy":
        return {
          description: MATH_TASKS[lev][taskK].description,
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
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
        }}
      >
        {findTasks(level, taskKind).description}
      </Text>
      <FlatList
        data={findTasks(level, taskKind).tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DisplayTask task={item} kind={taskKind} />}
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
