import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RoundButtonProps = {
  title?: string;
  onPress: () => void;
  isDisabled?: boolean;
  shadowWidth?: number;
  isSelected?: boolean;
  rotateAngle?: number;
};

const RoundButton: FC<RoundButtonProps> = ({
  title,
  onPress,
  isDisabled,
  isSelected,
  rotateAngle,
  shadowWidth = 5,
}) => {
  const { colors, typography } = useColors();

  const calculateOuterRadius = () => {
    return scalaDownDependingOnDevice(20 + 10);
  };

  return (
    <View
      style={{
        padding: 5,
        borderRadius: calculateOuterRadius(),
        width: scalaDownDependingOnDevice(120),
        height: scalaDownDependingOnDevice(120),
        borderColor: isSelected ? colors.lightGray : "transparent",
        borderWidth: isSelected ? scalaDownDependingOnDevice(6) : 0,
        transform: [{ rotate: `${rotateAngle}deg` }],
      }}
    >
      <Pressable
        style={{
          ...styles.button,
          elevation: 5,
          width: "100%",
          height: "100%",
          shadowRadius: 2.9,
          shadowOpacity: isSelected ? 0 : 0.4,
          borderRadius: scalaDownDependingOnDevice(20),
          shadowOffset: { width: shadowWidth, height: 5 },
          shadowColor: isDisabled ? colors.gray : colors.accent,
          backgroundColor: isDisabled ? colors.gray : colors.accent,
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
            opacity: isDisabled ? 0.8 : 1,
            fontFamily: typography.primaryBoldFont,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: scalaDownDependingOnDevice(30),
  },
});

export default RoundButton;
