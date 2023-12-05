import useColors from "hooks/useColors";
import { FC, useCallback, useEffect, useRef } from "react";
import { Animated, Easing, FlatList, Text, View } from "react-native";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayWrongAnswersProps {
  isChecked: boolean;
  wrongAnswers: number[];
  isAllAnsweredCorrectly: boolean;
}

const DisplayWrongAnswers: FC<DisplayWrongAnswersProps> = ({
  isChecked,
  wrongAnswers,
  isAllAnsweredCorrectly,
}) => {
  const { colors } = useColors();
  const translateAnimations = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.timing(translateAnimations, {
      toValue: 1,
      delay: 320,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1)),
    }).start();
  }, [translateAnimations]);

  const resetAnimation = useCallback(() => {
    Animated.timing(translateAnimations, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [translateAnimations]);

  useEffect(() => {
    if (isChecked) {
      startAnimation();
    }

    return () => {
      resetAnimation();
    };
  }, [isChecked, startAnimation]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        transform: [
          {
            translateY: translateAnimations.interpolate({
              inputRange: [0, 1],
              outputRange: [
                device.height,
                device.height - scalaDownDependingOnDevice(200),
              ], // Start and end points
            }),
          },
        ],
      }}
    >
      <View
        style={{
          marginHorizontal: scalaDownDependingOnDevice(105),
          width: device.width - scalaDownDependingOnDevice(77),
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: scalaDownDependingOnDevice(25),
            paddingBottom: scalaDownDependingOnDevice(4),
            color: isAllAnsweredCorrectly ? colors.correct : colors.incorrect,
          }}
        >
          {isAllAnsweredCorrectly ? "Viss pareizi!" : "Nepareizi!"}
        </Text>

        {!isAllAnsweredCorrectly && (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              // backgroundColor: colors.accentBackground,
              // height: !isAllAnsweredCorrectly ? "auto" : 0,
            }}
          >
            <Text
              style={{
                color: colors.incorrect,
                fontSize: scalaDownDependingOnDevice(20),
                paddingRight: scalaDownDependingOnDevice(10),
              }}
            >
              Pareizās atbildes:
            </Text>
            <FlatList
              data={wrongAnswers}
              numColumns={3}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                // backgroundColor: colors.accentBackground,
              }}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item, index }) => {
                const isFirstItem = index === 0;
                const isLastItem = index === wrongAnswers.length - 1;
                return (
                  <Text
                    style={{
                      color: colors.incorrect,
                      fontSize: scalaDownDependingOnDevice(20),
                      paddingLeft: isFirstItem
                        ? 0
                        : scalaDownDependingOnDevice(4),
                    }}
                  >
                    {item}
                    {!isLastItem && ","}
                  </Text>
                );
              }}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export default DisplayWrongAnswers;
