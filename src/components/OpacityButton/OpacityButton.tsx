import { type FC } from "react";
import { TouchableOpacity } from "react-native";

interface OpacityButtonProps {
  onPress: () => void;
  icon: JSX.Element;
}

const OpacityButton: FC<OpacityButtonProps> = ({ icon, onPress }) => {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};

export default OpacityButton;
