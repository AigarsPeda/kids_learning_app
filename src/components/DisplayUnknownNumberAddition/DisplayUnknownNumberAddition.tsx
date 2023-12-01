import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useColors";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { type MissingNumberTaskType } from "types/addition";
import { MissingNumberInputType, type AnswerType } from "types/common";

const inputAccessoryViewID1 = "input-ID1";
const inputAccessoryViewID2 = "input-ID2";
const inputAccessoryViewID3 = "input-ID3";

interface DisplayUnknownNumberAdditionProps {
  correct: AnswerType;
  sequenceNumber: number;
  task: MissingNumberTaskType;
  input: MissingNumberInputType;
  updateInputsValue: (value: MissingNumberInputType) => void;
}

type Ref = { focus: () => void } | null;

const DisplayUnknownNumberAddition = forwardRef<
  Ref,
  DisplayUnknownNumberAdditionProps
>(({ task, input, correct, sequenceNumber, updateInputsValue }, ref) => {
  const { colors } = useColors();
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  useEffect(() => {
    sequenceNumber === 0 && inputRef.current?.focus();
  }, []);

  return (
    <>
      <View style={styles.taskContainer}>
        <TextOrInputDisplay
          ref={inputRef}
          answer={correct}
          text={task.data.a}
          inputNumber={input?.a}
          inputAccessoryViewID={inputAccessoryViewID1}
          setInputNumber={(str) => {
            updateInputsValue({ ...input, a: str });
          }}
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
          answer={correct}
          text={task.data.b}
          inputNumber={input?.b}
          inputAccessoryViewID={inputAccessoryViewID2}
          setInputNumber={(str) => {
            updateInputsValue({ ...input, b: str });
          }}
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
          answer={correct}
          ref={inputRef}
          text={task.data.result}
          inputNumber={input?.result}
          inputAccessoryViewID={inputAccessoryViewID3}
          setInputNumber={(str) => updateInputsValue({ ...input, result: str })}
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
