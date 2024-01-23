import BuyLives from "components/BuyLives/BuyLives";
import OpacityButton from "components/OpacityButton/OpacityButton";
import HouseIcon from "components/icons/HouseIcon/HouseIcon";
import useStyles from "hooks/useStyles";
import { type FC } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface NoLivesProps {
  goHome: () => void;
  isLivesFinished: boolean;
  buyLivesUsingExperience: () => void;
  userData: UserSettingsType | undefined;
}

const NoLives: FC<NoLivesProps> = ({
  goHome,
  userData,
  isLivesFinished,
  buyLivesUsingExperience,
}) => {
  const { colors, typography } = useStyles();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BuyLives
          userData={userData}
          isModalVisible={isLivesFinished}
          buyLivesUsingExperience={buyLivesUsingExperience}
        />
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: scalaDownDependingOnDevice(8),
            paddingHorizontal: scalaDownDependingOnDevice(8),
          }}
        >
          <View
            style={{
              paddingVertical: scalaDownDependingOnDevice(20),
              paddingHorizontal: scalaDownDependingOnDevice(10),
            }}
          >
            <OpacityButton
              onPress={goHome}
              icon={
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.gray,
                      fontSize: scalaDownDependingOnDevice(18),
                      fontFamily: typography.primaryMediumFont,
                      marginRight: scalaDownDependingOnDevice(5),
                    }}
                  >
                    Atpakaļ
                  </Text>
                  <HouseIcon
                    stroke={colors.gray}
                    width={scalaDownDependingOnDevice(26)}
                    height={scalaDownDependingOnDevice(26)}
                  />
                </View>
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoLives;
