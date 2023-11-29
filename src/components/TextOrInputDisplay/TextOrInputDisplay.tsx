import useColors from "hooks/useColors";
import { useRef, type FC, forwardRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AnswerType } from "types/common";

interface TextOrInputDisplayProps {
  answer: AnswerType;
  inputNumber: number | undefined;
  inputAccessoryViewID: string;
  text: string | number | undefined;
  handlePress: () => void;
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
      handlePress,
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
          return colors.accent;
      }
    };

    // const handlePress = () => {
    //   if (inputRef.current && !text) {
    //     inputRef.current.focus();
    //   }
    // };

    const getInputNumberLength = () => {
      if (inputNumber) {
        return inputNumber.toString().length;
      }

      return 0;
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={handlePress}
        onPressIn={handlePress}
        style={{
          ...styles.container,
          borderWidth: text ? 0 : 3,
          // 0 === 36, 1 === 36 /2 , 2 === 36 / 3, 3 === 36 / 4, 4 === 36 / 5, 5 === 36 / 6, 6 === 36 / 7, 7 === 36 / 8, 8 === 36 / 9, 9 === 36 / 10

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
              // marginLeft: 70 / 2,
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
  },
  textInput: {
    fontSize: 32,
    display: "flex",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: 60,
    // height: 60,
    // marginLeft: 36,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default TextOrInputDisplay;
