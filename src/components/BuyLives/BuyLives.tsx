import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import ChildrenButtonText from "components/ChildrenButton/ChildrenButtonText";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import { type FC } from "react";
import { View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface BuyLivesProps {
  isBuyLivesDisabled?: boolean;
}

const BuyLives: FC<BuyLivesProps> = ({ isBuyLivesDisabled }) => {
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
        isDisabled={isBuyLivesDisabled}
        onPress={() => {
          console.log("save");
        }}
      >
        <ChildrenButtonText text="Uzpildīt dzīvības 300" />
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
