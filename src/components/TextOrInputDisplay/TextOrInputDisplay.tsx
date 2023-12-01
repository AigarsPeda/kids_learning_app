import useColors from "hooks/useColors";
import { forwardRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AnswerType } from "types/common";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface TextOrInputDisplayProps {
  answer: AnswerType;
  isDisabled?: boolean;
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
      isDisabled,
      inputNumber,
      inputAccessoryViewID,
      setInputNumber,
    },
    ref
  ) => {
    const { colors } = useColors();

    const getBorderColor = () => {
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
          borderColor: isDisabled ? getBorderColor() : colors.gray,
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
              color: colors.text,
            }}
            ref={ref}
            placeholder={" "}
            keyboardType="numeric"
            editable={!isDisabled}
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

// export default TextOrInputDisplay;

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
    fontSize: scalaDownDependingOnDevice(32),
    display: "flex",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: scalaDownDependingOnDevice(120),
    height: scalaDownDependingOnDevice(75),
    textAlign: "center",
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
