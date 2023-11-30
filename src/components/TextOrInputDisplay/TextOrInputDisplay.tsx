import useColors from "hooks/useColors";
import { useRef, type FC, forwardRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AnswerType } from "types/common";

interface TextOrInputDisplayProps {
  answer: AnswerType;
  inputNumber: number | undefined;
  inputAccessoryViewID: string;
  text: string | number | undefined;
  // handlePress: () => void;
  setInputNumber: (num: number | undefined) => void;
}

type Ref = TextInput | null;

const TextOrInputDisplay = forwardRef<Ref, TextOrInputDisplayProps>(
  (
    {
      text,
      answer,
      inputNumber,
      inputAccessoryViewID,
      // handlePress,
      setInputNumber,
    },
    ref
  ) => {
    const { colors } = useColors();
    // const inputRef = useRef<TextInput>(null);

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
          borderColor: getBorderColor(),
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
    width: 75,
    height: 75,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#020617",
    // overflow: "hidden",
  },
  textInput: {
    fontSize: 32,
    display: "flex",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 75,
    textAlign: "center",
    // paddingLeft: 36,
    // backgroundColor: "#0206",
    // marginLeft: 36,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default TextOrInputDisplay;
