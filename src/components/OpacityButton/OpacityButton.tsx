import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { type FC } from "react";
import { TouchableOpacity } from "react-native";

interface OpacityButtonProps {
  icon: JSX.Element;
  isDisabled?: boolean;
  onPress: () => void;
}

const OpacityButton: FC<OpacityButtonProps> = ({
  icon,
  isDisabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
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
