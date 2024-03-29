import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import ChildrenButton from "components/ChildrenButton/ChildrenButton";
import ChildrenButtonText from "components/ChildrenButton/ChildrenButtonText";
import ZigIcon from "components/icons/ZigIcon/ZigIcon";
import { LEVEL_SETTINGS } from "hardcoded";
import useStyles from "hooks/useStyles";
import React, { useEffect, useState, type FC } from "react";
import { FlatList, Text, View } from "react-native";
import { type UserSettingsType } from "types/game";
import { type RootStackParamList } from "types/navigation";
import createArray from "utils/createArray";
import formatTimeToString from "utils/formatTimeToString";
import getTimePassedSince from "utils/getTimePassedSince";
import { scalaDownDependingOnDevice } from "utils/metrics";

const { defaultLives, buyLivesWithExperience, livesRecoveryTimeInMinutes } =
  LEVEL_SETTINGS;

interface BuyLivesProps {
  isModalVisible: boolean;
  buyLivesUsingExperience: () => void;
  userData: UserSettingsType | undefined;
}

const BuyLives: FC<BuyLivesProps> = ({
  userData,
  isModalVisible,
  buyLivesUsingExperience,
}) => {
  const array = createArray(defaultLives);
  const { colors, typography } = useStyles();
  const [timeTillNextLife, setTimeTillNextLife] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isBuyLivesDisabled = userData?.user.lives.lives === defaultLives;
  const isUserEnoughExperience =
    (userData?.user.experience || 0) >= buyLivesWithExperience;

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
              size={scalaDownDependingOnDevice(28)}
              color={index < userLives ? colors.incorrect : colors.gray}
            />
          );
        }}
      />
      <Text
        style={{
          color: colors.text,
          fontFamily: typography.primaryMediumFont,
          fontSize: scalaDownDependingOnDevice(20),
          marginVertical: scalaDownDependingOnDevice(15),
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
          isDisabled={isBuyLivesDisabled || !isUserEnoughExperience}
          onPress={buyLivesUsingExperience}
        >
          <ChildrenButtonText text="Pirkt dzīvību 300" />
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
            navigation.navigate("WatchAdScreen");
          }}
        >
          <ChildrenButtonText text="Noskatīties reklāmu" />
        </ChildrenButton>
      </View>
    </>
  );
};

export default BuyLives;
