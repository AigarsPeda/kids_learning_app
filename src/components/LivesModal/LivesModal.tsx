import Ionicons from "@expo/vector-icons/Ionicons";
import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import MyButton from "components/MyButton/MyButton";
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
    if (isModalVisible && userData && userData?.user.lives.lives < 3) {
      const updateInterval = () => {
        const { hours, minutes, seconds, timeTillNextLife } =
          getTimePassedSince(
            userData?.user.lives.lastUpdate,
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
            <DisplayHeart health={userData?.user.lives?.lives} />
            <Text
              style={{
                color: colors.incorrect,
                marginTop: scalaDownDependingOnDevice(4),
                fontSize: scalaDownDependingOnDevice(22),
                marginLeft: scalaDownDependingOnDevice(5),
                fontFamily: typography.primaryMediumFont,
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
            onPress={() => {
              console.log("save");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: typography.primaryMediumFont,
                  fontSize: scalaDownDependingOnDevice(20),
                  marginTop: scalaDownDependingOnDevice(4),
                  marginRight: scalaDownDependingOnDevice(5),
                  letterSpacing: scalaDownDependingOnDevice(0.25),
                }}
              >
                Uzpildīt dzīvības 300
              </Text>
              <ZigIcon
                fill="#fff"
                width={scalaDownDependingOnDevice(20)}
                height={scalaDownDependingOnDevice(20)}
              />
            </View>
          </ChildrenButton>
          <MyButton
            title="Dzīvības bez ierobežojumiem"
            onPress={() => {
              console.log("cancel");
            }}
          />
          <MyButton
            title="Noskatīties reklāmu"
            onPress={() => {
              console.log("cancel");
            }}
          />
        </View>
      </TopModal>
    </>
  );
};

export default LivesModal;
