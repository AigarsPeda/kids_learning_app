import { FC } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import useColors from "hooks/useColors";

type MyButton = {
  title?: string;
  onPress: () => void;
};

const MyButton: FC<MyButton> = ({ onPress, title = "Save" }) => {
  const { colors } = useColors();
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: colors.accent,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.text,
          color: colors.text,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default MyButton;
