import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LivesModalProps {
  userData: UserSettingsType | undefined;
}

const LivesModal: FC<LivesModalProps> = ({ userData }) => {
  const { colors, typography } = useStyles();

  return (
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
  );
};

export default LivesModal;
