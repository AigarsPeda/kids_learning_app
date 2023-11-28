import { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useColors from "hooks/useColors";

interface TextOrInputDisplayProps {
  inputString: string;
  inputAccessoryViewID: string;
  text: string | number | undefined;
  setInputString: (str: string) => void;
}

const TextOrInputDisplay: FC<TextOrInputDisplayProps> = ({
  text,
  inputString,
  inputAccessoryViewID,
  setInputString,
}) => {
  const { colors } = useColors();

  return (
    <View
      style={{
        ...styles.container,
        borderWidth: text ? 0 : 3,
        borderColor: colors.accent,
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
          value={inputString}
          placeholder={""}
          keyboardType="numeric"
          onChangeText={setInputString}
          inputAccessoryViewID={inputAccessoryViewID}
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
