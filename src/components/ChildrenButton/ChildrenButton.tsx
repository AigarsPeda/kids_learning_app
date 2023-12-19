import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";
import { KeyTypeOfColors } from "../../styles/styles";

type ChildrenButtonProps = {
  // title?: string;

  onPress: () => void;
  isDisabled?: boolean;
  children: JSX.Element;
  color?: KeyTypeOfColors;
};

const ChildrenButton: FC<ChildrenButtonProps> = ({
  onPress,
  children,
  isDisabled,

  // title = "Save",
  color = "accent",
}) => {
  const { colors, typography } = useColors();
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scalaDownDependingOnDevice(10),
    paddingHorizontal: scalaDownDependingOnDevice(40),
  },
  text: {
    fontSize: scalaDownDependingOnDevice(20),
    lineHeight: scalaDownDependingOnDevice(21),
    letterSpacing: scalaDownDependingOnDevice(0.25),
  },
});

export default ChildrenButton;
