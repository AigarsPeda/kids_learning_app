import TextOrInputDisplay from "components/TextOrInputDisplay/TextOrInputDisplay";
import useColors from "hooks/useStyles";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { type EquationArgumentType } from "types/addition";
import { type InputType } from "types/common";
import getTasksSign from "utils/getTasksSign";
import { scalaDownDependingOnDevice } from "utils/metrics";

const inputAccessoryViewID1 = "input-ID1";
const inputAccessoryViewID2 = "input-ID2";
const inputAccessoryViewID3 = "input-ID3";

interface DisplayUnknownNumberAdditionProps {
  input: InputType;
  isChecked: boolean;
  sequenceNumber: number;
  task: EquationArgumentType;
  handelOnFocus: (id: string) => void;
  updateInputsValue: (value: InputType) => void;
}

type Ref = { focus: () => void; isFocused: () => boolean } | null;

const DisplayUnknownNumberAddition = forwardRef<
  Ref,
  DisplayUnknownNumberAdditionProps
>(
  (
    {
      task,
      input,
      isChecked,
      sequenceNumber,
      handelOnFocus,
      updateInputsValue,
    },
    ref
  ) => {
    const { colors, typography } = useColors();
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      isFocused: () => {
        return Boolean(inputRef.current?.isFocused());
      },
    }));

    useEffect(() => {
      // set the focus with delay
      if (sequenceNumber === 0) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 560);
      }
    }, [sequenceNumber]);

    return (
      <View style={styles.taskContainer}>
        <TextOrInputDisplay
          text={task.a}
          maxLength={3}
          ref={inputRef}
          inputNumber={input?.a}
          handelOnFocus={() => {
            handelOnFocus(task.id);
          }}
          answer={input?.correct || "unknown"}
          isDisabled={input?.isAnswered || isChecked}
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
              fontFamily: typography.primaryBoldFont,
            }}
          >
            {getTasksSign(task.kind)}
          </Text>
        </View>
        <TextOrInputDisplay
          text={task.b}
          maxLength={3}
          ref={inputRef}
          inputNumber={input?.b}
          answer={input?.correct || "unknown"}
          isDisabled={input?.isAnswered || isChecked}
          inputAccessoryViewID={inputAccessoryViewID2}
          setInputNumber={(str) => {
            updateInputsValue({ ...input, b: str });
          }}
          handelOnFocus={() => {
            handelOnFocus(task.id);
          }}
        />
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              color: colors.text,
              fontFamily: typography.primaryBoldFont,
            }}
          >
            =
          </Text>
        </View>
        <TextOrInputDisplay
          maxLength={3}
          ref={inputRef}
          text={task.result}
          inputNumber={input?.result}
          answer={input?.correct || "unknown"}
          isDisabled={input?.isAnswered || isChecked}
          inputAccessoryViewID={inputAccessoryViewID3}
          setInputNumber={(str) => updateInputsValue({ ...input, result: str })}
          handelOnFocus={() => {
            handelOnFocus(task.id);
          }}
        />
      </View>
    );
  }
);

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
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scalaDownDependingOnDevice(28),
  },
  text: {
    fontSize: scalaDownDependingOnDevice(25),
  },
});

export default DisplayUnknownNumberAddition;
