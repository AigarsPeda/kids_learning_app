import useStyles from "hooks/useStyles";
import { FC } from "react";
import { Text } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface ChildrenButtonTextProps {
  text: string;
}

const ChildrenButtonText: FC<ChildrenButtonTextProps> = ({ text }) => {
  const { typography } = useStyles();
  return (
    <Text
      style={{
        color: "#fff",
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
