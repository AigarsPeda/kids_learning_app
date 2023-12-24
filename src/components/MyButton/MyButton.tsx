import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { KeyTypeOfColors } from "styles/styles";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

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
        width: device.width * 0.85,
        marginHorizontal: scalaDownDependingOnDevice(10),
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
          color: "#fff",
          textAlign: "center",
          opacity: isDisabled ? 0.5 : 1,
          fontSize: scalaDownDependingOnDevice(20),
          fontFamily: typography.primaryMediumFont,
          letterSpacing: scalaDownDependingOnDevice(0.25),
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
});

export default MyButton;
