import ExperienceModal from "components/ExperienceModal/ExperienceModal";
import LivesModal from "components/LivesModal/LivesModal";
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
        <ExperienceModal userData={userData} />
        <LivesModal userData={userData} />
      </View>
    </View>
  );
};

export default HomeHeader;
