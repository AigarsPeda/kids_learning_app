import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import NextIcon from "components/icons/NextIcon/NextIcon";
import useColors from "hooks/useStyles";
import PinkMonster from "monster/PinkMonster";
import RedMonster from "monster/RedMonster";
import { type FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplaySummeryProps {
  goHome: () => void;
  handleNextLevel: () => void;
  startTimer: Date | null | undefined;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  goHome,
  startTimer,
  handleNextLevel,
}) => {
  const { colors, typography } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        padding: 16,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <PinkMonster
          width={scalaDownDependingOnDevice(150)}
          height={scalaDownDependingOnDevice(150)}
        />
        <RedMonster
          width={scalaDownDependingOnDevice(90)}
          height={scalaDownDependingOnDevice(90)}
        />
      </View>
      <Text
        style={{
          ...styles.headLine,
          color: colors.accent,
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: typography.primaryBoldFont,
          fontSize: scalaDownDependingOnDevice(30),
        }}
      >
        Level Completed
      </Text>
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
          fontWeight: "bold",
          fontFamily: typography.primaryBoldFont,
        }}
      >
        {getMinHoursPassed(startTimer)}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ChildrenButton color="gray" onPress={goHome}>
          <HouseIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(30)}
            height={scalaDownDependingOnDevice(30)}
          />
        </ChildrenButton>
        <ChildrenButton onPress={handleNextLevel}>
          <NextIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(30)}
            height={scalaDownDependingOnDevice(30)}
          />
        </ChildrenButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headLine: {
    margin: 16,
    fontSize: 20,
  },
});

export default DisplaySummery;
