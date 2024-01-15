import StatsCard from "components/DisplayStats/StatsCard";
import useStats from "hooks/useStats";
import { useEffect, useRef, type FC } from "react";
import { Animated, Easing, FlatList, StyleSheet, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayStatsProps {
  experience: number | undefined;
  startTimer: Date | null | undefined;
}

const DisplayStats: FC<DisplayStatsProps> = ({ startTimer, experience }) => {
  const stats = useStats({ startTimer, experience });
  const animations = useRef(stats.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      500,
      animations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          delay: 500,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.elastic(0.9),
        })
      )
    ).start();
  }, [animations, stats]);

  return (
    <View>
      <FlatList
        data={stats}
        horizontal
        style={{
          flexGrow: 0,
          overflow: "visible",
        }}
        keyExtractor={(item) => item.label}
        ItemSeparatorComponent={() => (
          <View style={{ width: scalaDownDependingOnDevice(4) }} />
        )}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              width: scalaDownDependingOnDevice(100),
              opacity: animations[index]?.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  scale: animations[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1], // Adjust the initial position
                  }),
                },
                {
                  translateY: animations[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 1], // Adjust the initial position
                  }),
                },
              ],
            }}
          >
            <StatsCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              title={item.value}
            />
          </Animated.View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flexGrow: 0,
  },
});

export default DisplayStats;
