import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { FC } from "react";
import { Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayStatsProps {
  startTimer: Date | null | undefined;
}

const DisplayStats: FC<DisplayStatsProps> = ({ startTimer }) => {
  const { colors, typography } = useColors();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
            fontSize: scalaDownDependingOnDevice(20),
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
            fontSize: scalaDownDependingOnDevice(20),
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
          {LEVEL_SETTINGS.experiencePerLevel}
        </Text>
      </View>
    </View>
  );
};

export default DisplayStats;
