import { TASK_COUNT_PER_LEVEL } from "hardcoded";
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
  const isFirstRender = useRef(true);
  const progressBarWidth = useRef(
    new Animated.Value(INITIAL_PROGRESSBAR_WIDTH)
  ).current;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const nextStep = currentLevelStep + 1;
    const newWidth = (WIDTH / TASK_COUNT_PER_LEVEL) * nextStep;

    if (currentLevelStep === TASK_COUNT_PER_LEVEL) {
      Animated.timing(progressBarWidth, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      return;
    }

    // Animate to the new width
    Animated.timing(progressBarWidth, {
      toValue: newWidth,
      duration: 500, // Duration in milliseconds
      useNativeDriver: false,
    }).start();
  }, [currentLevelStep]);

  return (
    <View
      style={{
        width: WIDTH,
        backgroundColor: colors.accentBackground,
        height: scalaDownDependingOnDevice(8),
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
