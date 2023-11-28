import { useState, type FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AdditionType } from "types/addition";
import TextOrInputDisplay from "../TextOrInputDisplay/TextOrInputDisplay";

interface DisplayUnknownNumberAdditionProps {
  tasks: AdditionType;
}

const DisplayUnknownNumberAddition: FC<DisplayUnknownNumberAdditionProps> = ({
  tasks,
}) => {
  const inputAccessoryViewID = "uniqueID";
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.textContainer}>
          <TextOrInputDisplay
            inputString={text}
            text={tasks.data.a}
            setInputString={setText}
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>+</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{tasks.data.b || "n/a"}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>=</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{tasks.data.result || "n/a"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // gap: 10,
    // alignItems: "center",
    // flexDirection: "column",
  },
  taskContainer: {
    gap: 10,
    margin: 10,
    width: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#221f1f",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "#221f1f",
  },
});

export default DisplayUnknownNumberAddition;
