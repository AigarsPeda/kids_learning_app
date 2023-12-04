import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useColors";
import { type FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

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
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: "#fff",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    elevation: 3,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scalaDownDependingOnDevice(12),
    paddingHorizontal: scalaDownDependingOnDevice(32),
  },
  text: {
    fontWeight: "bold",
    fontSize: scalaDownDependingOnDevice(16),
    lineHeight: scalaDownDependingOnDevice(21),
    letterSpacing: scalaDownDependingOnDevice(0.25),
  },
});

export default MyButton;
