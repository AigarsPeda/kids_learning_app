import useColors from "hooks/useStyles";
import { type FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import getMinHoursPassed from "utils/getMinHoursPassed";
import PinkMonster from "../../monster/PinkMonster";
import { scalaDownDependingOnDevice } from "../../utils/metrics";
import RedMonster from "../../monster/RedMonster";
import ChildrenButton from "../ChildrenButton/ChildrenButton";
import ChildrenButtonText from "../ChildrenButton/ChildrenButtonText";
import Ionicons from "@expo/vector-icons/Ionicons";
import NextIcon from "../icons/NextIcon/NextIcon";
import HouseIcon from "../icons/HouseIcon/HouseIcon";

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
      {/* <Button title="Next Level" onPress={handleNextLevel} /> */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ChildrenButton color="gray" onPress={goHome}>
          {/* <Ionicons
            name="home"
            color={"#fff"}
            size={scalaDownDependingOnDevice(20)}
          /> */}
          <HouseIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(30)}
            height={scalaDownDependingOnDevice(30)}
          />
        </ChildrenButton>
        <ChildrenButton onPress={handleNextLevel}>
          {/* <Ionicons
            color={"#fff"}
            name="arrow-forward"
            size={scalaDownDependingOnDevice(20)}
          /> */}
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
