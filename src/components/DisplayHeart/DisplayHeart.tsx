import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState, type FC } from "react";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface HomeScreenProps {
  health: number;
}

const DisplayHeart: FC<HomeScreenProps> = ({ health }) => {
  const [initialHealth, setInitialHealth] = useState(0);

  useEffect(() => {
    setInitialHealth(health);
  }, []);

  const healthRatio = health / initialHealth;

  if (healthRatio >= 0.5 && healthRatio < 1) {
    return (
      <Ionicons
        name="heart-half"
        size={scalaDownDependingOnDevice(31)}
        color="#eab308"
      />
    );
  }

  if (healthRatio < 0.5 && healthRatio > 0) {
    return (
      <Ionicons
        name="heart-outline"
        size={scalaDownDependingOnDevice(31)}
        color="#eab308"
      />
    );
  }

  if (healthRatio <= 0) {
    return (
      <Ionicons
        name="heart-dislike-outline"
        size={scalaDownDependingOnDevice(31)}
        color="#ff0033"
      />
    );
  }

  return (
    <Ionicons
      name="heart"
      size={scalaDownDependingOnDevice(31)}
      color="#4caf50"
    />
  );
};

export default DisplayHeart;
