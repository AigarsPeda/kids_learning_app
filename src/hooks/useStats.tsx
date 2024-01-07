import ClockIcon from "components/icons/ClockIcon/ClockIcon";
import PercentIcon from "components/icons/PercentIcon/PercentIcon";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import { LEVEL_SETTINGS } from "hardcoded";
import useColors from "hooks/useStyles";
import getMinHoursPassed from "utils/getMinHoursPassed";
import getPrecisionPercentage from "utils/getPrecisionPercentage";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface UseStatsProps {
  experience: number | undefined;
  startTimer: Date | null | undefined;
}

const useStats = ({ startTimer, experience }: UseStatsProps) => {
  const { colors } = useColors();

  // create array of strings from startTimer, experience, precision
  const stats = [
    {
      label: "Pieredze",
      value: experience?.toString() || "0",
      icon: (
        <ZigIcon
          fill={colors.text}
          stroke={colors.text}
          width={scalaDownDependingOnDevice(20)}
          height={scalaDownDependingOnDevice(20)}
          style={{
            marginLeft: scalaDownDependingOnDevice(5),
          }}
        />
      ),
    },
    {
      label: "Laiks",
      value: getMinHoursPassed(startTimer) || "N/A",
      icon: (
        <ClockIcon
          stroke={colors.text}
          width={scalaDownDependingOnDevice(20)}
          height={scalaDownDependingOnDevice(20)}
          style={{
            marginLeft: scalaDownDependingOnDevice(5),
          }}
        />
      ),
    },
    {
      label: "Precizitāte",
      value: getPrecisionPercentage({
        value: experience || 0,
        precision: LEVEL_SETTINGS.defaultLevelExperience,
      }).toString(),
      icon: (
        <PercentIcon
          stroke={colors.text}
          width={scalaDownDependingOnDevice(23)}
          height={scalaDownDependingOnDevice(23)}
          style={{
            marginLeft: scalaDownDependingOnDevice(5),
          }}
        />
      ),
    },
  ];

  return stats;
};

export default useStats;
