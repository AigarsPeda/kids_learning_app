import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useEffect, type FC } from "react";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import LevelScreen from "screens/LevelScreen/LevelScreen";
import { type LevelScreenPropsType } from "types/screen";

type RootStackParamList = {
  Home: undefined;
  LevelScreen: LevelScreenPropsType;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    BloggerSans: require("./assets/fonts/Blogger-Sans.ttf"),
    BloggerSansBold: require("./assets/fonts/Blogger-Sans-Bold.ttf"),
    BloggerSansMedium: require("./assets/fonts/Blogger-Sans-Medium.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      await hideAsync();
    };

    const preventAutoHideSplashScreen = async () => {
      await preventAutoHideAsync();
    };

    if (!fontsLoaded) {
      preventAutoHideSplashScreen();
    }

    if (fontsLoaded) {
      hideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {/* <StatusBar /> */}
      {/* <View style={styles.container}>
        <Text>App to learn kids staff !!</Text>
        <StatusBar style="auto" />
      </View> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LevelScreen"
          component={LevelScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
