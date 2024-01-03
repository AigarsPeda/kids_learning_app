import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable } from "react-native";
import { type KeyTypeOfColors } from "styles/styles";
import { scalaDownDependingOnDevice } from "utils/metrics";

type ChildrenButtonProps = {
  onPress: () => void;
  isDisabled?: boolean;
  color?: KeyTypeOfColors;
  children: JSX.Element | JSX.Element[];
};

const ChildrenButton: FC<ChildrenButtonProps> = ({
  onPress,
  children,
  isDisabled,
  color = "accent",
}) => {
  const { colors } = useColors();
  return (
    <Pressable
      style={{
        elevation: 5,
        borderRadius: 4,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: scalaDownDependingOnDevice(5),
        paddingVertical: scalaDownDependingOnDevice(8),
        paddingHorizontal: scalaDownDependingOnDevice(20),
        backgroundColor: isDisabled ? colors.gray : colors[color],
      }}
      disabled={isDisabled}
      onPress={() => {
        onPress();
        impactAsync(ImpactFeedbackStyle.Light);
      }}
    >
      {children}
    </Pressable>
  );
};

// const styles = StyleSheet.create({
//   text: {
//     letterSpacing: scalaDownDependingOnDevice(0.25),
//   },
//   // button: {
//   //   elevation: 5,
//   //   borderRadius: 4,
//   //   paddingVertical: scalaDownDependingOnDevice(8),
//   //   paddingHorizontal: scalaDownDependingOnDevice(20),
//   // },
// });

export default ChildrenButton;
