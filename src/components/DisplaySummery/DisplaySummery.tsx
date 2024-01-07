import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import ChildrenButtonText from "components/ChildrenButton/ChildrenButtonText";
import DisplayStats from "components/DisplayStats/DisplayStats";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import PlayIcon from "components/icons/PlayIcon/PlayIcon";
import useColors from "hooks/useStyles";
import PinkMonster from "monster/PinkMonster";
import RedMonster from "monster/RedMonster";
import { useEffect, useRef, type FC } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { device, scalaDownDependingOnDevice } from "utils/metrics";
import YellowMonster from "../../monster/YellowMonster";

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
  const slideAnim = useRef(new Animated.Value(device.width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      delay: 50,
      duration: 600, // Adjust the duration as needed
      easing: Easing.elastic(0.9),
      useNativeDriver: false, // You need to set this to false for layout animation
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
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
        {/* <RedMonster
          width={scalaDownDependingOnDevice(90)}
          height={scalaDownDependingOnDevice(90)}
        /> */}
        <YellowMonster
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
        Līmenis pabeigts!
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
          <HouseIcon
            stroke={colors.white}
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
    </Animated.View>
  );
};

export default DisplaySummery;
