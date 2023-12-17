import OpacityButton from "components/OpacityButton/OpacityButton";
import ZigIcon from "components/icons/Zig/Zig";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import { Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";
import TopModal from "../TopModal/TopModal";

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
      <TopModal isModalVisible={isModalVisible} openCloseModal={openCloseModal}>
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
      </TopModal>
    </>
  );
};

export default ExperienceModal;
