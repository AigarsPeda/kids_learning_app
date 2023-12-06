import useColors from "hooks/useColors";
import { type FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";

interface DisplaySummeryProps {
  startTimer: Date | null;
  resetLevel: () => void;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  startTimer,
  resetLevel,
}) => {
  const { colors } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        backgroundColor: colors.accentBackground,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
        }}
      >
        Level Completed
      </Text>
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
        }}
      >
        {getMinHoursPassed(startTimer)}
      </Text>
      <Button
        title="Next Level"
        onPress={() => {
          resetLevel();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headLine: {
    margin: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DisplaySummery;
