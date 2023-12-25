import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";

interface DisplaySummeryProps {
  goHome: () => void;
  handleNextLevel: () => void;
  startTimer: Date | null | undefined;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  goHome,
  startTimer,
  handleNextLevel,
}) => {
  const { colors, typography } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        padding: 16,
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
          fontWeight: "bold",
          fontFamily: typography.primaryBoldFont,
        }}
      >
        {getMinHoursPassed(startTimer)}
      </Text>
      <Button title="Next Level" onPress={handleNextLevel} />

      <Button title="Home" onPress={goHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  headLine: {
    margin: 16,
    fontSize: 20,
  },
});

export default DisplaySummery;
