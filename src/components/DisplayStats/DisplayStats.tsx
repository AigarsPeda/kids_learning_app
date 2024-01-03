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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
            {experience || 0}
          </Text>
          <ZigIcon
            fill={colors.text}
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scalaDownDependingOnDevice(10),
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
            {getPrecisionPercentage(experience)}
          </Text>
          <PercentIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: scalaDownDependingOnDevice(10),
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
            {getMinHoursPassed(startTimer)}
          </Text>
          <ClockIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DisplayStats;
