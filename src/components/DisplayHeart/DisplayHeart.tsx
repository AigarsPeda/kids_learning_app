import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, type FC } from "react";

interface HomeScreenProps {
  health: number;
}

const DisplayHeart: FC<HomeScreenProps> = ({ health }) => {
  const initialHealths = useRef(health);

  if (health <= initialHealths.current / 2) {
    return <Ionicons name="heart-half" size={32} color="#eab308" />;
  }

  if (health === 0) {
    return <Ionicons name="heart-dislike" size={32} color="#ff0033" />;
  }

  return <Ionicons name="heart" size={32} color="#4caf50" />;
};

export default DisplayHeart;
