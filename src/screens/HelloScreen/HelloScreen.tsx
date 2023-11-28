import DisplayUnknownNumberAddition from "@components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import useColors from "hooks/useColors";
import { useState, type FC } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { MATH_TASKS } from "tasks/math";

interface HelloScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HelloScreen: FC<HelloScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
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
    <View
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
        {findTasks(level).description}
      </Text>
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

export default HelloScreen;
