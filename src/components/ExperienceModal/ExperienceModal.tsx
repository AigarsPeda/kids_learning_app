import OpacityButton from "components/OpacityButton/OpacityButton";
import ZigIcon from "components/icons/Zig/Zig";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { device, scalaDownDependingOnDevice } from "utils/metrics";
import Modal from "react-native-modal";

interface HomeScreenProps {
  userData: UserSettingsType | undefined;
}

const ExperienceModal: FC<HomeScreenProps> = ({ userData }) => {
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
            <ZigIcon
              fill={colors.accent}
              width={scalaDownDependingOnDevice(30)}
              height={scalaDownDependingOnDevice(30)}
            />
            <Text
              style={{
                color: colors.accent,
                fontFamily: typography.primaryMediumFont,
                fontSize: scalaDownDependingOnDevice(22),
                marginLeft: scalaDownDependingOnDevice(5),
                marginTop: scalaDownDependingOnDevice(4),
                marginRight: scalaDownDependingOnDevice(10),
              }}
            >
              {userData?.user.experience}
            </Text>
          </View>
        }
      />
      <Modal
        hasBackdrop={true}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        deviceWidth={device.width}
        isVisible={isModalVisible}
        onBackdropPress={openCloseModal}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={200}
        backdropColor="rgba(16, 24, 39, 0.200)"
        style={{
          margin: 0,
          position: "relative",
        }}
      >
        <View
          style={{
            ...styles.modalView,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontFamily: typography.primaryMediumFont,
              fontSize: scalaDownDependingOnDevice(20),
              marginTop: scalaDownDependingOnDevice(10),
            }}
          >
            {userData?.user.experience}
          </Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    top: 0,
    padding: 35,
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
    width: device.width,
    position: "absolute",
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

export default ExperienceModal;
