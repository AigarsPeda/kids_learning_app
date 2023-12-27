import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { KeyTypeOfColors } from "styles/styles";
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
        ...styles.button,
        backgroundColor: isDisabled ? colors.gray : colors[color],
      }}
      disabled={isDisabled}
      onPress={() => {
        impactAsync(ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: scalaDownDependingOnDevice(10),
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    borderRadius: 4,
    paddingVertical: scalaDownDependingOnDevice(10),
    paddingHorizontal: scalaDownDependingOnDevice(35),
  },
  text: {
    letterSpacing: scalaDownDependingOnDevice(0.25),
  },
});

export default ChildrenButton;
