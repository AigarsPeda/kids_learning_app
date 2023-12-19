import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";
import { KeyTypeOfColors } from "../../styles/styles";

type MyButton = {
  title?: string;
  onPress: () => void;
  isDisabled?: boolean;
  color?: KeyTypeOfColors;
};

const MyButton: FC<MyButton> = ({
  onPress,
  isDisabled,
  title = "Save",
  color = "accent",
}) => {
  const { colors, typography } = useColors();
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: isDisabled ? colors.gray : colors[color],
      }}
      disabled={isDisabled}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <Text
        style={{
          ...styles.text,
          color: "#fff",
          letterSpacing: 0.5,
          opacity: isDisabled ? 0.5 : 1,
          fontFamily: typography.primaryMediumFont,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scalaDownDependingOnDevice(10),
    paddingHorizontal: scalaDownDependingOnDevice(40),
  },
  text: {
    fontSize: scalaDownDependingOnDevice(20),
    lineHeight: scalaDownDependingOnDevice(21),
    letterSpacing: scalaDownDependingOnDevice(0.25),
  },
});

export default MyButton;
