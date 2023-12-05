import useColors from "hooks/useColors";
import { useCallback, useEffect, useRef, type FC } from "react";
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

  if (isAllAnsweredCorrectly) {
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
                  device.height - scalaDownDependingOnDevice(250),
                ], // Start and end points
              }),
            },
          ],
        }}
      >
        <View
          style={{
            width: device.width,
            backgroundColor: colors.accentBackground,
          }}
        >
          <View
            style={{
              marginVertical: scalaDownDependingOnDevice(20),
              marginHorizontal: scalaDownDependingOnDevice(40),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: scalaDownDependingOnDevice(23),
                color: isAllAnsweredCorrectly
                  ? colors.correct
                  : colors.incorrect,
              }}
            >
              Viss pareizi! 🎉
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }

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
                device.height - scalaDownDependingOnDevice(270),
              ], // Start and end points
            }),
          },
        ],
      }}
    >
      <View
        style={{
          display: "flex",
          width: device.width,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.accentBackground,
        }}
      >
        <View
          style={{
            margin: "auto",
            width: device.width / 1.5,
            marginVertical: scalaDownDependingOnDevice(20),
            marginHorizontal: scalaDownDependingOnDevice(40),
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              color: colors.incorrect,
              fontSize: scalaDownDependingOnDevice(25),
              paddingBottom: scalaDownDependingOnDevice(4),
            }}
          >
            Nepareizi! 😔
          </Text>

          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
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
        </View>
      </View>
    </Animated.View>
  );
};

export default DisplayWrongAnswers;
