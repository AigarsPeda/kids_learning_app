import Ionicons from "@expo/vector-icons/Ionicons";
import OpacityButton from "components/OpacityButton/OpacityButton";
import useStatusBarHeight from "hooks/useStatusBarHeight";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

interface TopModalProps {
  isModalVisible: boolean;
  children: React.ReactNode;
  openCloseModal: () => void;
}

const TopModal: FC<TopModalProps> = ({
  children,
  isModalVisible,
  openCloseModal,
}) => {
  const { colors } = useStyles();
  const { statusBarHeight } = useStatusBarHeight();

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
      backdropColor="rgba(16, 24, 39, 0.000)"
      style={{
        margin: 0,
        position: "relative",
      }}
    >
      <View
        style={{
          top: 0,
          elevation: 5,
          shadowRadius: 4,
          shadowOpacity: 0.25,
          width: device.width,
          position: "absolute",
          alignItems: "center",
          shadowColor: "#0f172a",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingTop: statusBarHeight,
          backgroundColor: colors.lightGray,
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
            paddingHorizontal: scalaDownDependingOnDevice(13),
          }}
        >
          <OpacityButton
            onPress={openCloseModal}
            icon={
              <Ionicons
                name="close"
                color={colors.gray}
                size={scalaDownDependingOnDevice(30)}
              />
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default TopModal;
