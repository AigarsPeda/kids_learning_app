import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { Text } from "react-native";
import { type KeyTypeOfColors } from "styles/styles";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface ChildrenButtonTextProps {
  text: string;
  color?: KeyTypeOfColors;
}

const ChildrenButtonText: FC<ChildrenButtonTextProps> = ({
  text,
  color = "white",
}) => {
  const { typography, colors } = useStyles();
  return (
    <Text
      style={{
        color: colors[color],
        fontFamily: typography.primaryMediumFont,
        fontSize: scalaDownDependingOnDevice(18),
        marginTop: scalaDownDependingOnDevice(4),
        marginRight: scalaDownDependingOnDevice(5),
        letterSpacing: scalaDownDependingOnDevice(0.25),
      }}
    >
      {text}
    </Text>
  );
};

export default ChildrenButtonText;
