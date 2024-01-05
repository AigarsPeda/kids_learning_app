import Ionicons from "@expo/vector-icons/Ionicons";
import BuyLives from "components/BuyLives/BuyLives";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import TopModal from "components/TopModal/TopModal";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import { useEffect, useState, type FC } from "react";
import { FlatList, Text, View } from "react-native";
import createArray from "utils/createArray";
import formatTimeToString from "utils/formatTimeToString";
import getTimePassedSince from "utils/getTimePassedSince";
import { scalaDownDependingOnDevice } from "utils/metrics";
import { UserSettingsType } from "types/game";

const { defaultLives, livesRecoveryTimeInMinutes } = LEVEL_SETTINGS;

interface LivesModalProps {
  buyLivesUsingExperience: () => void;
  userData: UserSettingsType | undefined;
}

const LivesModal: FC<LivesModalProps> = ({
  userData,
  buyLivesUsingExperience,
}) => {
  const { colors, typography } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeTillNextLife, setTimeTillNextLife] = useState("");

  const array = createArray(defaultLives);

  const openCloseModal = () => {
    setIsModalVisible((state) => !state);
  };

  useEffect(() => {
    const { user } = userData || {};
    const { lives } = user || {};

    if (isModalVisible && lives?.lives < defaultLives) {
      const updateInterval = () => {
        const { hours, minutes, seconds, timeTillNextLife } =
          getTimePassedSince(lives.lastUpdate, livesRecoveryTimeInMinutes);

        if (timeTillNextLife <= 0) {
          setTimeTillNextLife("");
          return;
        }

        setTimeTillNextLife(formatTimeToString({ hours, minutes, seconds }));
      };

      // Run the function immediately
      updateInterval();

      // Set up the interval to run the function every second
      const interval = setInterval(updateInterval, 1000);

      // Clean up the interval on component unmount or when dependencies change
      return () => clearInterval(interval);
    } else {
      setTimeTillNextLife("");
    }
  }, [isModalVisible, userData]);

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
        <FlatList
          data={array}
          numColumns={3}
          style={{ marginTop: scalaDownDependingOnDevice(10) }}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const userLives = userData?.user.lives.lives || 0;

            return (
              <Ionicons
                key={index}
                name="heart"
                size={scalaDownDependingOnDevice(28)}
                color={index < userLives ? colors.incorrect : colors.gray}
              />
            );
          }}
        />
        <Text
          style={{
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(20),
            marginVertical: scalaDownDependingOnDevice(15),
          }}
        >
          {timeTillNextLife !== ""
            ? `Nākamā dzīvība pēc ${timeTillNextLife}`
            : `Visas dzīvības ir atjaunotas`}
        </Text>
        <BuyLives
          userData={userData}
          buyLivesUsingExperience={buyLivesUsingExperience}
        />
      </TopModal>
    </>
  );
};

export default LivesModal;
