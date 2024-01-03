import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import DisplayStats from "components/DisplayStats/DisplayStats";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import PlayIcon from "components/icons/PlayIcon/PlayIcon";
import useColors from "hooks/useStyles";
import PinkMonster from "monster/PinkMonster";
import RedMonster from "monster/RedMonster";
import { type FC } from "react";
import { Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";
import ChildrenButtonText from "../ChildrenButton/ChildrenButtonText";

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
        padding: scalaDownDependingOnDevice(25),
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
          fontWeight: "bold",
          textAlign: "center",
          color: colors.accent,
          fontFamily: typography.primaryBoldFont,
          fontSize: scalaDownDependingOnDevice(35),
          marginTop: scalaDownDependingOnDevice(40),
          marginBottom: scalaDownDependingOnDevice(20),
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
          marginTop: scalaDownDependingOnDevice(40),
        }}
      >
        <ChildrenButton color="gray" onPress={goHome}>
          <ChildrenButtonText text="Mājas" />
          <HouseIcon
            stroke={"#fff"}
            width={scalaDownDependingOnDevice(25)}
            height={scalaDownDependingOnDevice(25)}
          />
        </ChildrenButton>
        <ChildrenButton onPress={handleNextLevel}>
          <ChildrenButtonText text="Nākamais" />
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

export default DisplaySummery;
