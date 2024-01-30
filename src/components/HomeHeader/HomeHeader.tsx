import { useFocusEffect } from "@react-navigation/native";
import ExperienceModal from "components/ExperienceModal/ExperienceModal";
import LivesModal from "components/LivesModal/LivesModal";
import useStyles from "hooks/useStyles";
import useUserSettings from "hooks/useUserSettings";
import { useCallback, type FC } from "react";
import { Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

// interface HomeHeaderProps {
//   handleOpenAddScreen: () => void;
// }

const HomeHeader: FC = () => {
  const { colors, typography } = useStyles();
  const { userData, getUserData, buyLivesUsingExperience } = useUserSettings();

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

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
          fontSize: scalaDownDependingOnDevice(35),
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
        <LivesModal
          userData={userData}
          buyLivesUsingExperience={buyLivesUsingExperience}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
