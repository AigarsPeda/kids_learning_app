import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";

interface DisplaySummeryProps {
  goHome: () => void;
  startTimer: Date | null;
  resetLevel: () => void;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  goHome,
  startTimer,
  resetLevel,
}) => {
  const { colors, typography } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        padding: 16,
        borderRadius: 8,
        backgroundColor: colors.accentBackground,
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
      <Button
        title="Next Level"
        onPress={() => {
          resetLevel();
        }}
      />
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
