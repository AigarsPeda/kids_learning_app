import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import useColors from "hooks/useStyles";
import { useEffect, useRef, type FC } from "react";
import { Animated, View } from "react-native";
import { device } from "utils/metrics";

const WIDTH = device.width - 120;
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
        height: 6,

        borderRadius: 8,
        width: WIDTH,
        backgroundColor: colors.accentBackground,
      }}
    >
      <Animated.View
        style={{
          height: 6,
          borderRadius: 8,
          width: progressBarWidth,
          backgroundColor: colors.accent,
        }}
      />
    </View>
  );
};

export default Progressbar;
