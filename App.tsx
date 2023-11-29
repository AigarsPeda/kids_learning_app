import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DifferentScreen from "@screens/DifferentScreen/DifferentScreen";
import { type FC } from "react";
import HomeScreen from "screens/HomeScreen/HomeScreen";

const Stack = createNativeStackNavigator();

const App: FC = () => {
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
        <Stack.Screen name="DifferentScreen" component={DifferentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
