import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";
import { LEVEL_SETTINGS } from "../../hardcoded";

type RoundButtonProps = {
  title?: string;
  onPress: () => void;
  isDisabled?: boolean;
  shadowWidth?: number;
  isSelected?: boolean;
  rotateAngle?: number;
  levelProgress: number;
};

const RoundButton: FC<RoundButtonProps> = ({
  title,
  onPress,
  isDisabled,
  isSelected,
  rotateAngle,
  levelProgress,
  // shadowWidth = 5,
}) => {
  const { colors, typography } = useColors();

  const calculateOuterRadius = () => {
    return scalaDownDependingOnDevice(20 + 10);
  };

  const calculateHeight = () => {
    return (
      (scalaDownDependingOnDevice(150) / LEVEL_SETTINGS.levelParts) *
      levelProgress
    );
  };

  const rotateInOppositeDirection = () => {
    if (!rotateAngle) return 0;
    // if (rotateAngle === 0) return 0;
    return rotateAngle * -1;
  };

  return (
    <View
      style={{
        padding: 5,
        position: "relative",
        borderRadius: calculateOuterRadius(),
        width: scalaDownDependingOnDevice(120),
        height: scalaDownDependingOnDevice(120),
        transform: [{ rotate: `${rotateAngle}deg` }],
        borderColor: isSelected ? colors.lightGray : "transparent",
        borderWidth: isSelected ? scalaDownDependingOnDevice(6) : 0,
      }}
    >
      <View style={{ position: "absolute", bottom: -2, left: -1, right: 0 }}>
        {/* Shadow */}
        {!isSelected && (
          <View
            style={{
              width: scalaDownDependingOnDevice(115),
              height: scalaDownDependingOnDevice(115),
              opacity: levelProgress ? levelProgress : 0,
              borderRadius: scalaDownDependingOnDevice(25),
              backgroundColor: isDisabled ? colors.lightGray : colors.gray,
            }}
          />
        )}
      </View>
      <Pressable
        style={{
          ...styles.button,
          elevation: 5,
          width: "100%",
          height: "100%",
          shadowRadius: 2.9,
          overflow: "hidden",
          shadowOpacity: isSelected ? 0 : 0.4,
          borderRadius: scalaDownDependingOnDevice(20),
          // shadowOffset: { width: shadowWidth, height: 5 },
          // shadowColor: isDisabled ? colors.gray : colors.accent,
          backgroundColor: isDisabled ? colors.gray : "transparent",
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
            zIndex: 1,
            color: colors.text,
            letterSpacing: 0.3,
            position: "absolute",
            opacity: isDisabled ? 0.8 : 1,
            fontFamily: typography.primaryBoldFont,
          }}
        >
          {title}
        </Text>
        {!isDisabled && (
          <View
            style={{ position: "absolute", bottom: -10, left: -10, right: 0 }}
          >
            <View
              style={{
                height: calculateHeight(),
                backgroundColor: colors.accent,
                width: scalaDownDependingOnDevice(160),
                opacity: levelProgress ? levelProgress : 0,
                // borderRadius: scalaDownDependingOnDevice(20),
                transform: [{ rotate: `${rotateInOppositeDirection()}deg` }],
              }}
            />
          </View>
        )}
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
