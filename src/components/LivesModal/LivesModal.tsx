import Ionicons from "@expo/vector-icons/Ionicons";
import DisplayHeart from "components/DisplayHeart/DisplayHeart";
import OpacityButton from "components/OpacityButton/OpacityButton";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import { useEffect, useState, type FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { type UserSettingsType } from "types/game";
import createArray from "utils/createArray";
import formatTimeToString from "utils/formatTimeToString";
import getTimePassedSince from "utils/getTimePassedSince";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

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
        const { hours, minutes, seconds } = getTimePassedSince(
          userData?.user.lastUpdate,
          LEVEL_SETTINGS.livesRecoveryTimeInMinutes
        );
        setTimeTillNextLife(formatTimeToString({ hours, minutes, seconds }));
      };

      // Run the function immediately
      updateInterval();

      // Set up the interval to run the function every second
      const interval = setInterval(updateInterval, 1000);

      // Clean up the interval on component unmount or when dependencies change
      return () => clearInterval(interval);
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

      <Modal
        animationInTiming={500}
        animationOutTiming={750}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        deviceWidth={device.width}
        isVisible={isModalVisible}
        hasBackdrop={true}
        onBackdropPress={openCloseModal}
        backdropColor="rgba(16, 24, 39, 0.100)"
        style={{
          margin: 0,
          position: "relative",
        }}
      >
        {/* <View
        // style={{
        //   flex: 1,
        // }}
        // style={{
        //   position: "relative",
        //   // ...styles.modalView,
        //   // height: scalaDownDependingOnDevice(50),
        // }}
        > */}
        <View
          style={{
            ...styles.modalView,
          }}
        >
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
              marginTop: scalaDownDependingOnDevice(10),
            }}
          >
            {timeTillNextLife}
          </Text>
        </View>
        {/* </View> */}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // centeredView: {
  //   // top: 0,
  //   // position: "absolute",
  // },
  modalView: {
    position: "absolute",
    top: 0,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    width: device.width,
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default LivesModal;
