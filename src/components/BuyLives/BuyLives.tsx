import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import ChildrenButtonText from "components/ChildrenButton/ChildrenButtonText";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import { LEVEL_SETTINGS } from "hardcoded";
import { type FC } from "react";
import { View } from "react-native";
import { type UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

const { defaultLives, buyLivesWithExperience } = LEVEL_SETTINGS;

interface BuyLivesProps {
  buyLivesUsingExperience: () => void;
  userData: UserSettingsType | undefined;
}

const BuyLives: FC<BuyLivesProps> = ({ userData, buyLivesUsingExperience }) => {
  const isBuyLivesDisabled = userData?.user.lives.lives === defaultLives;
  const isUserEnoughExperience =
    (userData?.user.experience || 0) >= buyLivesWithExperience;

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: scalaDownDependingOnDevice(10),
        marginTop: scalaDownDependingOnDevice(10),
        paddingHorizontal: scalaDownDependingOnDevice(20),
      }}
    >
      <ChildrenButton
        isDisabled={isBuyLivesDisabled || !isUserEnoughExperience}
        onPress={buyLivesUsingExperience}
      >
        <ChildrenButtonText text="Pirkt dzīvību 300" />
        <ZigIcon
          fill="#fff"
          width={scalaDownDependingOnDevice(20)}
          height={scalaDownDependingOnDevice(20)}
        />
      </ChildrenButton>
      <ChildrenButton
        onPress={() => {
          console.log("save");
        }}
      >
        <ChildrenButtonText text="Dzīvības bez ierobežojumiem" />
      </ChildrenButton>
      <ChildrenButton
        isDisabled={isBuyLivesDisabled}
        onPress={() => {
          console.log("save 111");
        }}
      >
        <ChildrenButtonText text="Noskatīties reklāmu" />
      </ChildrenButton>
    </View>
  );
};

export default BuyLives;
