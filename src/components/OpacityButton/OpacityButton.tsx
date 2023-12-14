import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { type FC } from "react";
import { TouchableOpacity } from "react-native";

interface OpacityButtonProps {
  icon: JSX.Element;
  onPress: () => void;
}

const OpacityButton: FC<OpacityButtonProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default OpacityButton;
