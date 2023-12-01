import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useColors";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {
  type EquationArgumentType,
  type MissingNumberTaskType,
} from "types/addition";
import { MissingNumberInputType, type AnswerType } from "types/common";
import isMissingNumberAnswerCorrect from "utils/isMissingNumberAnswerCorrect";

const inputAccessoryViewID1 = "input-ID1";
const inputAccessoryViewID2 = "input-ID2";
const inputAccessoryViewID3 = "input-ID3";

interface DisplayUnknownNumberAdditionProps {
  sequenceNumber: number;
  task: MissingNumberTaskType;
}

type Ref = { focus: () => void } | null;

const DisplayUnknownNumberAddition = forwardRef<
  Ref,
  DisplayUnknownNumberAdditionProps
>(({ task, sequenceNumber }, ref) => {
  const { colors } = useColors();
  const inputRef = useRef<TextInput>(null);
  const [answer, setAnswer] = useState<AnswerType>("unknown");
  const [text, setText] = useState<MissingNumberInputType>({
    a: task.data.a,
    b: task.data.b,
    result: task.data.result,
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    // ... other methods or properties you want to expose
  }));

  useEffect(() => {
    sequenceNumber === 0 && inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setAnswer(isMissingNumberAnswerCorrect(text));
  }, [text]);

  return (
    <>
      <View style={styles.taskContainer}>
        <TextOrInputDisplay
          ref={inputRef}
          answer={answer}
          text={task.data.a}
          inputNumber={text.a}
          inputAccessoryViewID={inputAccessoryViewID1}
          setInputNumber={(str) => setText((state) => ({ ...state, a: str }))}
        />
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
        <TextOrInputDisplay
          ref={inputRef}
          answer={answer}
          text={task.data.b}
          inputNumber={text.b}
          inputAccessoryViewID={inputAccessoryViewID2}
          setInputNumber={(str) => setText((state) => ({ ...state, b: str }))}
        />
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
        <TextOrInputDisplay
          answer={answer}
          ref={inputRef}
          text={task.data.result}
          inputNumber={text.result}
          inputAccessoryViewID={inputAccessoryViewID3}
          setInputNumber={(str) =>
            setText((state) => ({ ...state, result: str }))
          }
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  taskContainer: {
    width: "auto",
    display: "flex",
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default DisplayUnknownNumberAddition;
