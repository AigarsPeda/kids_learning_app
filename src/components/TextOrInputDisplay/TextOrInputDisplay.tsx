import { FC } from "react";
import { StyleSheet, Text, TextInput } from "react-native";

interface TextOrInputDisplayProps {
  text: number | undefined;
  inputAccessoryViewID: string;
  inputString: string;
  setInputString: (str: string) => void;
}

const TextOrInputDisplay: FC<TextOrInputDisplayProps> = ({
  text,
  inputString,
  inputAccessoryViewID,
  setInputString,
}) => {
  return (
    <>
      {text ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <TextInput
          style={{
            fontSize: 20,
            display: "flex",
            fontWeight: "bold",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          value={inputString}
          placeholder={""}
          keyboardType="numeric"
          onChangeText={setInputString}
          inputAccessoryViewID={inputAccessoryViewID}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "#221f1f",
  },
});

export default TextOrInputDisplay;
