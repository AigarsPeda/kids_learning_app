import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import ZigIcon from "components/icons/Zig/Zig";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

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
        <OpacityButton
          onPress={() => {
            console.log("pressed");
          }}
          icon={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ZigIcon
                fill={colors.accent}
                width={scalaDownDependingOnDevice(30)}
                height={scalaDownDependingOnDevice(30)}
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
            </View>
          }
        />
        <OpacityButton
          onPress={() => {
            console.log("pressed");
          }}
          icon={
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
                  fontSize: scalaDownDependingOnDevice(22),
                  marginLeft: scalaDownDependingOnDevice(5),
                  marginTop: scalaDownDependingOnDevice(4),
                }}
              >
                {userData?.user.lives}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default HomeHeader;
