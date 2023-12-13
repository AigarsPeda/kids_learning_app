import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";

interface DisplaySummeryProps {
  goHome: () => void;
  startTimer: Date | null;
  isLivesFinished: boolean;
  handleNextLevel: () => void;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  goHome,
  startTimer,
  isLivesFinished,
  handleNextLevel,
}) => {
  const { colors, typography } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        padding: 16,
        // borderRadius: 8,
        // backgroundColor: colors.accentBackground,
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
      {!isLivesFinished && (
        <Button
          title="Next Level"
          onPress={() => {
            // TODO: save to async storage
            // add 1 to level
            // set key v1: {level: 1, lives: 3, tasks: []}

            handleNextLevel();
          }}
        />
      )}
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
