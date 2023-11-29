import { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useColors from "hooks/useColors";
import { AnswerType } from "types/common";

interface TextOrInputDisplayProps {
  answer: AnswerType;
  inputNumber: number | undefined;
  inputAccessoryViewID: string;
  text: string | number | undefined;
  setInputNumber: (num: number | undefined) => void;
}

const TextOrInputDisplay: FC<TextOrInputDisplayProps> = ({
  text,
  answer,
  inputNumber,
  inputAccessoryViewID,
  setInputNumber,
}) => {
  const { colors } = useColors();

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

  return (
    <View
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 20,
    display: "flex",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TextOrInputDisplay;
