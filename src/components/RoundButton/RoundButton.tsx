import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

type RoundButtonProps = {
  title?: string;
  onPress: () => void;
  shadowWidth?: number;
  rotateAngle?: number;
  isCompleted?: boolean;
  levelProgress: number;
  isSelectable: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({
  title,
  onPress,
  rotateAngle,
  isCompleted,
  isSelectable,
  levelProgress,
}) => {
  const { colors, typography } = useColors();

  const calculateOuterRadius = () => {
    return scalaDownDependingOnDevice(20 + 10);
  };

  const calculateHeight = () => {
    if (isCompleted) return scalaDownDependingOnDevice(130);

    const height =
      (scalaDownDependingOnDevice(130) / LEVEL_SETTINGS.levelParts) *
      levelProgress;

    return height;
  };

  const rotateInOppositeDirection = () => {
    if (!rotateAngle) return 0;
    return rotateAngle * -1;
  };

  return (
    <View
      style={{
        padding: 5,
        borderRadius: calculateOuterRadius(),
        width: scalaDownDependingOnDevice(120),
        height: scalaDownDependingOnDevice(120),
        transform: [{ rotate: `${rotateAngle}deg` }],
        // add border
        // borderWidth: 2,
        // borderColor: colors.accent,
      }}
    >
      <View style={{ position: "absolute", bottom: -2, left: -1, right: 0 }}>
        <View
          style={{
            width: scalaDownDependingOnDevice(115),
            height: scalaDownDependingOnDevice(115),
            opacity: levelProgress ? levelProgress : 0,
            borderRadius: scalaDownDependingOnDevice(25),
            backgroundColor: colors.lightGray,
          }}
        />
      </View>
      <Pressable
        style={{
          ...styles.button,
          elevation: 5,
          width: "100%",
          height: "100%",
          shadowRadius: 2.9,
          overflow: "hidden",
          shadowOpacity: isSelectable ? 0 : 0.4,
          borderRadius: scalaDownDependingOnDevice(20),
          backgroundColor: !isSelectable ? colors.gray : "transparent",
        }}
        disabled={!isSelectable}
        onPress={() => {
          impactAsync(ImpactFeedbackStyle.Light);
          onPress();
        }}
      >
        <Text
          style={{
            ...styles.text,
            zIndex: 1,
            color: "white",
            letterSpacing: 0.3,
            position: "absolute",
            opacity: !isSelectable ? 0.8 : 1,
            fontFamily: typography.primaryBoldFont,
          }}
        >
          {title}
        </Text>
        {isSelectable && (
          <View
            style={{ position: "absolute", bottom: -10, left: -10, right: 0 }}
          >
            <View
              style={{
                height: calculateHeight(),
                backgroundColor: colors.accent,
                width: scalaDownDependingOnDevice(160),
                opacity: levelProgress ? levelProgress : 0,
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
