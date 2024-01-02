import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayStatsProps {
  experience: number | undefined;
  startTimer: Date | null | undefined;
}

const DisplayStats: FC<DisplayStatsProps> = ({ startTimer, experience }) => {
  const { colors, typography } = useColors();

  const getPrecisionPercentage = (endExperience: number | undefined) => {
    if (!endExperience) {
      return 0;
    }

    const precisionPercentage = Math.round(
      (endExperience / LEVEL_SETTINGS.defaultLevelExperience) * 100
    );

    return precisionPercentage;
  };

  return (
    <View
      style={{
        gap: scalaDownDependingOnDevice(10),
        marginVertical: scalaDownDependingOnDevice(20),
      }}
    >
      <View
        style={{
          borderWidth: 3,
          borderRadius: 10,
          borderColor: colors.accent,
          padding: scalaDownDependingOnDevice(10),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.accent,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(16),
            marginBottom: scalaDownDependingOnDevice(10),
          }}
        >
          Laiks
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.accent,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(20),
          }}
        >
          {getMinHoursPassed(startTimer)}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 3,
          borderRadius: 10,
          borderColor: colors.correct,
          padding: scalaDownDependingOnDevice(10),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.correct,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(16),
            marginBottom: scalaDownDependingOnDevice(10),
          }}
        >
          Pieredze
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.correct,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(20),
          }}
        >
          {experience || 0}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 3,
          borderRadius: 10,
          borderColor: colors.incorrect,
          padding: scalaDownDependingOnDevice(10),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.incorrect,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(16),
            marginBottom: scalaDownDependingOnDevice(10),
          }}
        >
          Precizitāte
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.incorrect,
            fontFamily: typography.primaryBoldFont,
            fontSize: scalaDownDependingOnDevice(20),
          }}
        >
          {getPrecisionPercentage(experience)} %
        </Text>
      </View>
    </View>
  );
};

export default DisplayStats;
