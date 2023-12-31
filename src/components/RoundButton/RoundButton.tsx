import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, Text, View } from "react-native";
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
    <Pressable
      style={({ pressed }) => [
        {
          padding: 5,
          borderRadius: calculateOuterRadius(),
          width: scalaDownDependingOnDevice(120),
          height: scalaDownDependingOnDevice(120),
        },
        {
          transform: [
            { scale: pressed ? 0.9 : 1 },
            { rotate: `${rotateAngle}deg` },
          ],
        },
      ]}
      disabled={!isSelectable}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <View style={{ position: "absolute", bottom: -2, left: -1, right: 0 }}>
        <View
          style={{
            backgroundColor: colors.lightGray,
            width: scalaDownDependingOnDevice(115),
            height: scalaDownDependingOnDevice(115),
            opacity: levelProgress ? levelProgress : 0,
            borderRadius: scalaDownDependingOnDevice(25),
          }}
        />
      </View>
      <View
        style={{
          elevation: 5,
          width: "100%",
          height: "100%",
          display: "flex",
          shadowRadius: 2.9,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          shadowOpacity: isSelectable ? 0 : 0.4,
          borderRadius: scalaDownDependingOnDevice(20),
          backgroundColor: !isSelectable ? colors.gray : "transparent",
        }}
      >
        <Text
          style={{
            zIndex: 1,
            color: "white",
            letterSpacing: 0.3,
            position: "absolute",
            opacity: !isSelectable ? 0.8 : 1,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(30),
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
      </View>
    </Pressable>
  );
};

export default RoundButton;
