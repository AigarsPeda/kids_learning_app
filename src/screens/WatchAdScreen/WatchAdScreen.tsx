import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { type RootStackParamList } from "types/navigation";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   Home: undefined; // Add other routes here as needed
// };

// interface WatchAdScreenProps {
//   navigation: {
//     navigate: (arg: string) => void;
//   };
// }

// const adUnitId = __DEV__
//   ? TestIds.APP_OPEN
//   : "ca-app-pub-5238286944896076/9540669827";

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   keywords: ["fashion", "clothing"],
// });

const WatchAdScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState("");
  const { colors, typography } = useStyles();
  const [content, setContent] = useState("");

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setLoaded(true);
  //     }
  //   );
  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     (reward) => {
  //       console.log("User earned reward of ", reward);
  //     }
  //   );

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          color: colors.text,
        }}
      >
        Watch Ad Screen 2
      </Text>

      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        value={content}
        style={styles.input}
        onChangeText={setContent}
      />

      <Button
        title="Go to Home Screen"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 5,
    padding: 5,
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: "black",
  },
  label: {
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default WatchAdScreen;
