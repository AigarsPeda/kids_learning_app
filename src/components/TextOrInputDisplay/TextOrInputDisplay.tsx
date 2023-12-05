import useColors from "hooks/useColors";
import { forwardRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AnswerType } from "types/common";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface TextOrInputDisplayProps {
  maxLength?: number;
  answer: AnswerType;
  isDisabled?: boolean;
  handelOnFocus?: () => void;
  inputAccessoryViewID: string;
  inputNumber: number | undefined;
  text: string | number | undefined;
  setInputNumber: (num: number | undefined) => void;
}

type Ref = TextInput | null;

const TextOrInputDisplay = forwardRef<Ref, TextOrInputDisplayProps>(
  (
    {
      text,
      answer,
      maxLength,
      isDisabled,
      inputNumber,
      handelOnFocus,
      setInputNumber,
      inputAccessoryViewID,
    },
    ref
  ) => {
    const { colors } = useColors();

    const getColor = () => {
      switch (answer) {
        case "correct":
          return colors.correct;
        case "incorrect":
          return colors.incorrect;
        case "unknown":
          return colors.gray;
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...styles.container,
          borderWidth: text ? 0 : 3,
          backgroundColor: colors.accentBackground,
          borderColor: isDisabled ? getColor() : colors.gray,
        }}
      >
        {text ? (
          <Text
            style={{
              ...styles.text,
              color: colors.text,
            }}
          >
            {text}
          </Text>
        ) : (
          <TextInput
            style={{
              ...styles.textInput,
              color: isDisabled ? getColor() : colors.text,
            }}
            ref={ref}
            placeholder={" "}
            inputMode="numeric"
            maxLength={maxLength}
            keyboardType="numeric"
            editable={!isDisabled}
            onFocus={handelOnFocus}
            value={inputNumber?.toString() || ""}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={(text) => {
              const number = parseInt(text);

              if (!isNaN(number)) {
                setInputNumber(number);
                return;
              }

              setInputNumber(undefined);
            }}
          />
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scalaDownDependingOnDevice(75),
    height: scalaDownDependingOnDevice(75),
  },
  textInput: {
    display: "flex",
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scalaDownDependingOnDevice(120),
    height: scalaDownDependingOnDevice(75),
    fontSize: scalaDownDependingOnDevice(32),

    // paddingLeft: 36,
    // backgroundColor: "#0206",
    // marginLeft: 36,
  },
  text: {
    fontWeight: "bold",
    fontSize: scalaDownDependingOnDevice(32),
  },
});

export default TextOrInputDisplay;
