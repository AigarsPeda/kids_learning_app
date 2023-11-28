import DisplayUnknownNumberAddition from "@components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import { MATH_TASKS } from "@tasks/math";
import { useState, type FC } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

interface HelloScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HelloScreen: FC<HelloScreenProps> = ({ navigation }) => {
  const [level, setLevel] = useState("easy");

  const findTasks = (level: string) => {
    switch (level) {
      case "easy":
        return MATH_TASKS.easy;
      // case "medium":
      //   return MATH_TASKS.medium.tasks;
      default:
        return MATH_TASKS.easy;
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DifferentScreen")}
      />
      <Text>{findTasks(level).description}</Text>
      <FlatList
        data={findTasks(level).tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DisplayUnknownNumberAddition tasks={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default HelloScreen;
