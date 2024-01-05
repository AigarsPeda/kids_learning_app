import OpacityButton from "components/OpacityButton/OpacityButton";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface NoLivesProps {
  goHome: () => void;
}

const NoLives: FC<NoLivesProps> = ({ goHome }) => {
  const { colors } = useStyles();

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingVertical: scalaDownDependingOnDevice(8),
        paddingHorizontal: scalaDownDependingOnDevice(8),
      }}
    >
      <View
        style={{
          paddingVertical: scalaDownDependingOnDevice(20),
          paddingHorizontal: scalaDownDependingOnDevice(10),
        }}
      >
        <OpacityButton
          onPress={goHome}
          icon={
            <HouseIcon
              stroke={colors.white}
              width={scalaDownDependingOnDevice(35)}
              height={scalaDownDependingOnDevice(35)}
            />
          }
        />
      </View>
    </View>
  );
};

export default NoLives;
