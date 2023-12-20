import Ionicons from "@expo/vector-icons/Ionicons";
import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import ChildrenButtonText from "components/ChildrenButton/ChildrenButtonText";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import TopModal from "components/TopModal/TopModal";
import ZigIcon from "components/icons/Zig/Zig";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import { useEffect, useState, type FC } from "react";
import { FlatList, Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import createArray from "utils/createArray";
import formatTimeToString from "utils/formatTimeToString";
import getTimePassedSince from "utils/getTimePassedSince";
import { scalaDownDependingOnDevice } from "utils/metrics";

const { defaultLives, livesRecoveryTimeInMinutes } = LEVEL_SETTINGS;

interface LivesModalProps {
  userData: UserSettingsType | undefined;
}

const LivesModal: FC<LivesModalProps> = ({ userData }) => {
  const { colors, typography } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeTillNextLife, setTimeTillNextLife] = useState("");

  const array = createArray(defaultLives);
  const isBuyLivesDisabled = userData?.user.lives.lives === defaultLives;

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
                color={index < userLives ? colors.incorrect : colors.gray}
                size={scalaDownDependingOnDevice(28)}
              />
            );
          }}
        />
        <Text
          style={{
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(20),
            marginVertical: scalaDownDependingOnDevice(10),
          }}
        >
          {timeTillNextLife !== ""
            ? `Nākamā dzīvība pēc ${timeTillNextLife}`
            : `Visas dzīvības ir atjaunotas`}
        </Text>
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
              console.log("save");
            }}
          >
            <ChildrenButtonText text="Noskatīties reklāmu" />
          </ChildrenButton>
        </View>
      </TopModal>
    </>
  );
};

export default LivesModal;
