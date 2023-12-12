import Ionicons from "@expo/vector-icons/Ionicons";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface HomeScreenProps {
  health?: number;
}

const DisplayHeart: FC<HomeScreenProps> = ({ health = 0 }) => {
  const { colors } = useStyles();

  const healthRatio = health / LEVEL_SETTINGS.defaultLives;

  if (healthRatio >= 0.5 && healthRatio < 1) {
    return (
      <Ionicons
        name="heart-half"
        color={colors.incorrect}
        size={scalaDownDependingOnDevice(30)}
      />
    );
  }

  if (healthRatio < 0.5 && healthRatio > 0) {
    return (
      <Ionicons
        name="heart-outline"
        color={colors.incorrect}
        size={scalaDownDependingOnDevice(30)}
      />
    );
  }

  if (healthRatio <= 0) {
    return (
      <Ionicons
        name="heart-dislike-outline"
        color={colors.incorrect}
        size={scalaDownDependingOnDevice(30)}
      />
    );
  }

  return (
    <Ionicons
      name="heart"
      color={colors.incorrect}
      size={scalaDownDependingOnDevice(30)}
    />
  );
};

export default DisplayHeart;
