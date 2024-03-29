import MyButton from "components/MyButton/MyButton";
import OpacityButton from "components/OpacityButton/OpacityButton";
import TopModal from "components/TopModal/TopModal";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import { Text, View } from "react-native";
import { UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface ExperienceModalProps {
  userData: UserSettingsType | undefined;
}

const ExperienceModal: FC<ExperienceModalProps> = ({ userData }) => {
  const { colors, typography } = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openCloseModal = () => {
    setIsModalVisible((state) => !state);
  };

  return (
    <>
      <OpacityButton
        isDisabled
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
              width={scalaDownDependingOnDevice(28)}
              height={scalaDownDependingOnDevice(28)}
            />
            <Text
              style={{
                color: colors.accent,
                fontFamily: typography.primaryMediumFont,
                fontSize: scalaDownDependingOnDevice(20),
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
            fontSize: scalaDownDependingOnDevice(25),
            marginTop: scalaDownDependingOnDevice(10),
          }}
        >
          Tev ir {userData?.user.experience} pieredze
        </Text>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: scalaDownDependingOnDevice(10),
            marginTop: scalaDownDependingOnDevice(10),
            paddingHorizontal: scalaDownDependingOnDevice(40),
          }}
        >
          <MyButton
            title="Uzpildīt dzīvības 300"
            isDisabled={(userData?.user.experience || 0) < 300}
            onPress={() => {
              console.log("save");
            }}
          />
          {/* <MyButton
            title="Noskatīties reklāmu"
            onPress={() => {
              // console.log("cancel");
              navigation.push("AddScreen");
            }}
          /> */}
        </View>
      </TopModal>
    </>
  );
};

export default ExperienceModal;
