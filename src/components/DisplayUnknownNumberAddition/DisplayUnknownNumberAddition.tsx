import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useColors";
import { useEffect, useState, type FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  type EquationArgumentType,
  type MissingNumberTaskType,
} from "types/addition";
import { NonNullable } from "types/utils";
import isMissingNumberAnswerCorrect from "utils/isMissingNumberAnswerCorrect";
import { AnswerType } from "../../types/common";

const inputAccessoryViewID1 = "uniqueID1";
const inputAccessoryViewID2 = "uniqueID2";
const inputAccessoryViewID3 = "uniqueID3";

interface DisplayUnknownNumberAdditionProps {
  task: MissingNumberTaskType;
}

type NoUndefinedEquationArgumentType = NonNullable<EquationArgumentType>;

const DisplayUnknownNumberAddition: FC<DisplayUnknownNumberAdditionProps> = ({
  task,
}) => {
  const { colors } = useColors();
  const [answer, setAnswer] = useState<AnswerType>("unknown"); // [a, b, result
  const [text, setText] = useState<EquationArgumentType>({
    a: task.data.a,
    b: task.data.b,
    result: task.data.result,
  });

  useEffect(() => {
    setAnswer(isMissingNumberAnswerCorrect(text));
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.textContainer}>
          <TextOrInputDisplay
            answer={answer}
            text={task.data.a}
            inputNumber={text.a}
            inputAccessoryViewID={inputAccessoryViewID1}
            setInputNumber={(str) => setText((state) => ({ ...state, a: str }))}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}
          >
            +
          </Text>
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{tasks.data.b || "n/a"}</Text> */}
          <TextOrInputDisplay
            answer={answer}
            text={task.data.b}
            inputNumber={text.b}
            inputAccessoryViewID={inputAccessoryViewID2}
            setInputNumber={(str) => setText((state) => ({ ...state, b: str }))}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}
          >
            =
          </Text>
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>{tasks.data.result || "n/a"}</Text> */}
          <TextOrInputDisplay
            answer={answer}
            text={task.data.result}
            inputNumber={text.result}
            inputAccessoryViewID={inputAccessoryViewID3}
            setInputNumber={(str) =>
              setText((state) => ({ ...state, result: str }))
            }
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
