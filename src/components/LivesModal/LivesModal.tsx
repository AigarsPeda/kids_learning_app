import BuyLives from "components/BuyLives/BuyLives";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import TopModal from "components/TopModal/TopModal";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import { Text, View } from "react-native";
import { UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LivesModalProps {
  handleOpenAddScreen: () => void;
  buyLivesUsingExperience: () => void;
  userData: UserSettingsType | undefined;
}

const LivesModal: FC<LivesModalProps> = ({
  userData,
  handleOpenAddScreen,
  buyLivesUsingExperience,
}) => {
  const { colors, typography } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openCloseModal = () => {
    setIsModalVisible((state) => !state);
  };

  return (
    <>
      <OpacityButton
        onPress={openCloseModal}
        icon={
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <DisplayHeart health={userData?.user.lives?.lives} />
            <Text
              style={{
                color: colors.incorrect,
                fontFamily: typography.primaryMediumFont,
                marginTop: scalaDownDependingOnDevice(4),
                fontSize: scalaDownDependingOnDevice(20),
                marginLeft: scalaDownDependingOnDevice(5),
              }}
            >
              {userData?.user.lives.lives}
            </Text>
          </View>
        }
      />

      <TopModal isModalVisible={isModalVisible} openCloseModal={openCloseModal}>
        <BuyLives
          userData={userData}
          isModalVisible={isModalVisible}
          handleOpenAddScreen={handleOpenAddScreen}
          buyLivesUsingExperience={buyLivesUsingExperience}
        />
      </TopModal>
    </>
  );
};

export default LivesModal;
