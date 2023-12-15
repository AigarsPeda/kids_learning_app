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

const ExperienceModal: FC<HomeScreenProps> = ({ userData }) => {
  const { colors, typography } = useStyles();

  return (
    <>
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
    </>
  );
};

export default ExperienceModal;
