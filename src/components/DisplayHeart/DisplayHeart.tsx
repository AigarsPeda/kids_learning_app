import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState, type FC } from "react";

interface HomeScreenProps {
  health: number;
}

const DisplayHeart: FC<HomeScreenProps> = ({ health }) => {
  const [initialHealth, setInitialHealth] = useState(0);

  useEffect(() => {
    setInitialHealth(health);
  }, []);

  const healthRatio = health / initialHealth;

  console.log("healthRatio", healthRatio);

  if (healthRatio >= 0.5 && healthRatio < 1) {
    return <Ionicons name="heart-half" size={32} color="#eab308" />;
  }

  if (healthRatio < 0.5 && healthRatio > 0) {
    return <Ionicons name="heart-outline" size={32} color="#eab308" />;
  }

  if (healthRatio <= 0) {
    return <Ionicons name="heart-dislike-outline" size={32} color="#ff0033" />;
  }

  return <Ionicons name="heart" size={32} color="#4caf50" />;
};

export default DisplayHeart;
