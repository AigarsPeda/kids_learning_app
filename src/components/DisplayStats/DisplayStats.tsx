import StatsCard from "components/DisplayStats/StatsCard";
import ClockIcon from "components/icons/ClockIcon/ClockIcon";
import PercentIcon from "components/icons/PercentIcon/PercentIcon";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";
import getPrecisionPercentage from "utils/getPrecisionPercentage";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayStatsProps {
  experience: number | undefined;
  startTimer: Date | null | undefined;
}

const DisplayStats: FC<DisplayStatsProps> = ({ startTimer, experience }) => {
  const { colors } = useColors();

  return (
    <View
      style={{
        gap: scalaDownDependingOnDevice(3),
      }}
    >
      <StatsCard
        label="Pieredze"
        title={experience?.toString() || "0"}
        icon={
          <ZigIcon
            width={20}
            height={20}
            fill={colors.text}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        }
      />

      <StatsCard
        label="Precizitāte"
        title={getPrecisionPercentage({
          value: experience || 0,
          precision: LEVEL_SETTINGS.defaultLevelExperience,
        }).toString()}
        icon={
          <PercentIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        }
      />

      <StatsCard
        label="Laiks"
        title={getMinHoursPassed(startTimer) || "N/A"}
        icon={
          <ClockIcon
            width={20}
            height={20}
            stroke={colors.text}
            style={{
              marginLeft: scalaDownDependingOnDevice(15),
            }}
          />
        }
      />
    </View>
  );
};

export default DisplayStats;
