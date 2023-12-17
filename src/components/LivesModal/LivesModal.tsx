import Ionicons from "@expo/vector-icons/Ionicons";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import TopModal from "components/TopModal/TopModal";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import { useEffect, useState, type FC } from "react";
import { FlatList, Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import createArray from "utils/createArray";
import formatTimeToString from "utils/formatTimeToString";
import getTimePassedSince from "utils/getTimePassedSince";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LivesModalProps {
  userData: UserSettingsType | undefined;
}

const LivesModal: FC<LivesModalProps> = ({ userData }) => {
  const { colors, typography } = useStyles();
  const array = createArray(LEVEL_SETTINGS.defaultLives);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeTillNextLife, setTimeTillNextLife] = useState("");

  const openCloseModal = () => {
    setIsModalVisible((state) => !state);
  };

  useEffect(() => {
    if (isModalVisible && userData && userData?.user.lives < 3) {
      const updateInterval = () => {
        const { hours, minutes, seconds, timeTillNextLife } =
          getTimePassedSince(
            userData?.user.lastUpdate,
            LEVEL_SETTINGS.livesRecoveryTimeInMinutes
          );

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
            <DisplayHeart health={userData?.user.lives} />
            <Text
              style={{
                color: colors.incorrect,
                marginTop: scalaDownDependingOnDevice(4),
                fontSize: scalaDownDependingOnDevice(22),
                marginLeft: scalaDownDependingOnDevice(5),
                fontFamily: typography.primaryMediumFont,
              }}
            >
              {userData?.user.lives}
            </Text>
          </View>
        }
      />

      <TopModal isModalVisible={isModalVisible} openCloseModal={openCloseModal}>
        <FlatList
          data={array}
          numColumns={3}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const userLives = userData?.user.lives || 0;

            return (
              <Ionicons
                key={index}
                name="heart"
                color={index < userLives ? colors.incorrect : colors.gray}
                size={scalaDownDependingOnDevice(30)}
              />
            );
          }}
        />
        <Text
          style={{
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(20),
            marginTop: scalaDownDependingOnDevice(20),
          }}
        >
          {timeTillNextLife !== ""
            ? `Nākamā dzīvība pēc ${timeTillNextLife}`
            : `Visas dzīvības ir atjaunotas`}
        </Text>
      </TopModal>
    </>
  );
};

export default LivesModal;
