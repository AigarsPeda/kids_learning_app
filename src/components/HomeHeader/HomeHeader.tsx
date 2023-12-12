import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import useStyles from "hooks/useStyles";
import useUserSettings from "hooks/useUserSettings";
import { Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

const HomeHeader = () => {
  const { userData } = useUserSettings();
  const { colors, typography } = useStyles();

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
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
        <DisplayHeart health={userData?.user.lives} />
        <Text
          style={{
            color: colors.incorrect,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(29),
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
