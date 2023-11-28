import TextOrInputDisplay from "@components/TextOrInputDisplay/TextOrInputDisplay";
import { useState, type FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AdditionType } from "types/addition";

interface DisplayUnknownNumberAdditionProps {
  tasks: AdditionType;
}

const DisplayUnknownNumberAddition: FC<DisplayUnknownNumberAdditionProps> = ({
  tasks,
}) => {
  const inputAccessoryViewID1 = "uniqueID1";
  const inputAccessoryViewID2 = "uniqueID2";
  const inputAccessoryViewID3 = "uniqueID3";
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.textContainer}>
          <TextOrInputDisplay
            inputString={text}
            text={tasks.data.a}
            setInputString={setText}
            inputAccessoryViewID={inputAccessoryViewID1}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>+</Text>
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{tasks.data.b || "n/a"}</Text> */}
          <TextOrInputDisplay
            inputString={text}
            text={tasks.data.b}
            setInputString={setText}
            inputAccessoryViewID={inputAccessoryViewID2}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>=</Text>
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{tasks.data.result || "n/a"}</Text> */}
          <TextOrInputDisplay
            inputString={text}
            text={tasks.data.result}
            setInputString={setText}
            inputAccessoryViewID={inputAccessoryViewID3}
          />
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
    // borderWidth: 1,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // borderColor: "#221f1f",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    // borderColor: "#221f1f",
  },
});

export default DisplayUnknownNumberAddition;
