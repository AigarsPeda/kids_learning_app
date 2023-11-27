import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DifferentScreen from "@screens/DifferentScreen/DifferentScreen";
import HelloScreen from "@screens/HelloScreen/HelloScreen";
import { type FC } from "react";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
        <Text>App to learn kids staff !!</Text>
        <StatusBar style="auto" />
      </View> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HelloScreen} />
        <Stack.Screen name="DifferentScreen" component={DifferentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

export default App;
