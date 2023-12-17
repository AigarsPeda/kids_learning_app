import Ionicons from "@expo/vector-icons/Ionicons";
import useStyles from "hooks/useStyles";
import React, { type FC } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { device, scalaDownDependingOnDevice } from "utils/metrics";
import OpacityButton from "../OpacityButton/OpacityButton";

interface TopModalProps {
  isModalVisible: boolean;
  openCloseModal: () => void;
  children: React.ReactNode;
}

const TopModal: FC<TopModalProps> = ({
  children,
  isModalVisible,
  openCloseModal,
}) => {
  const { colors, typography } = useStyles();

  return (
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
          top: 0,
          paddingTop: scalaDownDependingOnDevice(35),
          elevation: 5,
          shadowRadius: 4,
          shadowOpacity: 0.25,
          width: device.width,
          position: "absolute",
          alignItems: "center",
          backgroundColor: "white",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: "#0f172a",
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
      >
        {children}
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingVertical: scalaDownDependingOnDevice(8),
            paddingHorizontal: scalaDownDependingOnDevice(8),
          }}
        >
          <OpacityButton
            onPress={openCloseModal}
            icon={
              <Ionicons
                name="close"
                color={colors.gray}
                size={scalaDownDependingOnDevice(40)}
              />
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default TopModal;
