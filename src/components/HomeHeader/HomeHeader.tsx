import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { Text, View } from "react-native";
import { UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";
import Ionicons from "@expo/vector-icons/Ionicons";

interface HomeScreenProps {
  userData: UserSettingsType | undefined;
}

const HomeHeader: FC<HomeScreenProps> = ({ userData }) => {
  const { colors, typography } = useStyles();

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: typography.primaryMediumFont,
          fontSize: scalaDownDependingOnDevice(40),
        }}
      >
        Choose Level
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="gift"
          color={colors.accent}
          size={scalaDownDependingOnDevice(30)}
        />
        <Text
          style={{
            color: colors.accent,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(22),
            marginLeft: scalaDownDependingOnDevice(5),
            marginTop: scalaDownDependingOnDevice(4),
            marginRight: scalaDownDependingOnDevice(10),
          }}
        >
          {userData?.user.experience}
        </Text>
        <DisplayHeart health={userData?.user.lives} />
        <Text
          style={{
            color: colors.incorrect,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(22),
            marginLeft: scalaDownDependingOnDevice(5),
            marginTop: scalaDownDependingOnDevice(4),
          }}
        >
          {userData?.user.lives}
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;
