import useStyles from "hooks/useStyles";
import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import useStatusBarHeight from "hooks/useStatusBarHeight";
import { scalaDownDependingOnDevice } from "../../utils/metrics";
import ChildrenButton from "../ChildrenButton/ChildrenButton";
import ChildrenButtonText from "../ChildrenButton/ChildrenButtonText";
import HouseIcon from "../icons/HouseIcon/HouseIcon";

interface NoLivesProps {
  goHome: () => void;
}

const NoLives: FC<NoLivesProps> = ({ goHome }) => {
  const { colors, typography } = useStyles();
  const { statusBarHeight } = useStatusBarHeight();
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: scalaDownDependingOnDevice(20),
        paddingHorizontal: scalaDownDependingOnDevice(20),
      }}
    >
      <ChildrenButton color="transparent" onPress={goHome}>
        <ChildrenButtonText text="Mājas" />
        <HouseIcon
          stroke={"#fff"}
          width={scalaDownDependingOnDevice(25)}
          height={scalaDownDependingOnDevice(25)}
        />
      </ChildrenButton>
    </View>
  );
};

const styles = StyleSheet.create({
  headLine: {
    margin: 16,
    fontSize: 20,
  },
});

export default NoLives;
