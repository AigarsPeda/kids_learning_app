import ClockIcon from "components/icons/ClockIcon/ClockIcon";
import PercentIcon from "components/icons/PercentIcon/PercentIcon";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
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
        gap: scalaDownDependingOnDevice(3),
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scalaDownDependingOnDevice(10),
          paddingHorizontal: scalaDownDependingOnDevice(52),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          Pieredze
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          {experience || 0}
          {/* <TargetIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          /> */}
          <ZigIcon
            fill={colors.text}
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scalaDownDependingOnDevice(10),
          paddingHorizontal: scalaDownDependingOnDevice(52),
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          Precizitāte
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          {getPrecisionPercentage(experience)}
          <PercentIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scalaDownDependingOnDevice(10),
          paddingHorizontal: scalaDownDependingOnDevice(52),
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          Laiks
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(18),
          }}
        >
          {getMinHoursPassed(startTimer)}
          <ClockIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </Text>
      </View>
    </View>
  );
};

export default DisplayStats;
