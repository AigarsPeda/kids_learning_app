import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import DisplayStats from "components/DisplayStats/DisplayStats";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import PlayIcon from "components/icons/PlayIcon/PlayIcon";
import useColors from "hooks/useStyles";
import PinkMonster from "monster/PinkMonster";
import RedMonster from "monster/RedMonster";
import { type FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplaySummeryProps {
  goHome: () => void;
  handleNextLevel: () => void;
  experience: number | undefined;
  startTimer: Date | null | undefined;
}

const DisplaySummery: FC<DisplaySummeryProps> = ({
  goHome,
  startTimer,
  experience,
  handleNextLevel,
}) => {
  const { colors, typography } = useColors();

  return (
    <View
      style={{
        ...styles.headLine,
        padding: scalaDownDependingOnDevice(16),
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
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
      <DisplayStats startTimer={startTimer} experience={experience} />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: scalaDownDependingOnDevice(10),
        }}
      >
        <ChildrenButton color="gray" onPress={goHome}>
          <Text
            style={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: typography.primaryBoldFont,
              fontSize: scalaDownDependingOnDevice(18),
            }}
          >
            Mājas
          </Text>
          <HouseIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(25)}
            height={scalaDownDependingOnDevice(25)}
          />
        </ChildrenButton>
        <ChildrenButton onPress={handleNextLevel}>
          <Text
            style={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: typography.primaryBoldFont,
              fontSize: scalaDownDependingOnDevice(18),
            }}
          >
            Nākamais
          </Text>
          <PlayIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(25)}
            height={scalaDownDependingOnDevice(25)}
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
