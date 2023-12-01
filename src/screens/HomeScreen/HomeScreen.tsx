import DisplayTask from "components/DisplayTask/DisplayTask";
import MyButton from "components/MyButton/MyButton";
import useColors from "hooks/useColors";
import React, { useEffect, useState, type FC } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
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
import useTasks from "../../hooks/useTasks";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const { tasks, taskKind, setLevel, setTaskKind } = useTasks();

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
        {tasks.description}
      </Text>

      <DisplayTask tasks={tasks.tasks} kind={taskKind} />

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
