import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RoundButtonProps = {
  title?: string;
  onPress: () => void;
  isDisabled?: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({ title, onPress, isDisabled }) => {
  const { colors, typography } = useColors();
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: colors.accent,
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
          letterSpacing: 0.3,
          opacity: isDisabled ? 0.5 : 1,
          fontFamily: typography.primaryBoldFont,
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
    display: "flex",
    borderRadius: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: scalaDownDependingOnDevice(120),
    height: scalaDownDependingOnDevice(120),
  },
  text: {
    fontSize: scalaDownDependingOnDevice(30),
  },
});

export default RoundButton;
