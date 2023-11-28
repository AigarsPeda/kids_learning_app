import { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
  return (
    <View
      style={{
        width: 50,
        height: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: text ? 0 : 3,
        borderColor: "#9333ea",
        borderRadius: 5,
      }}
    >
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TextOrInputDisplay;
