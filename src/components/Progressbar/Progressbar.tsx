import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { useEffect, useRef, type FC } from "react";
import { Animated, View } from "react-native";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

const WIDTH = device.width - 150;
const INITIAL_PROGRESSBAR_WIDTH = WIDTH * 0.05; // 5% of total width

interface ProgressbarProps {
  currentLevelStep: number;
}

const Progressbar: FC<ProgressbarProps> = ({ currentLevelStep }) => {
  const { colors } = useColors();
  const progressBarWidth = useRef(
    new Animated.Value(INITIAL_PROGRESSBAR_WIDTH)
  ).current;

  useEffect(() => {
    if (currentLevelStep === 0) {
      return;
    }

    const newWidth =
      (WIDTH / LEVEL_SETTINGS.levelParts) * (currentLevelStep - 1);

    // Animate to the new width
    Animated.timing(progressBarWidth, {
      duration: 500,
      toValue: newWidth,
      useNativeDriver: false,
    }).start();
  }, [currentLevelStep]);

  return (
    <View
      style={{
        width: WIDTH,
        overflow: "hidden",
        height: scalaDownDependingOnDevice(8),
        backgroundColor: colors.accentBackground,
        borderRadius: scalaDownDependingOnDevice(8),
      }}
    >
      <Animated.View
        style={{
          width: progressBarWidth,
          backgroundColor: colors.accent,
          height: scalaDownDependingOnDevice(8),
          borderRadius: scalaDownDependingOnDevice(8),
        }}
      />
    </View>
  );
};

export default Progressbar;
