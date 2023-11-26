import Hello from "@components/Hello/Hello";
import { StatusBar } from "expo-status-bar";
import { type FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const App: FC = () => {
  return (
    <View style={styles.container}>
      <Text>App to learn kids staff</Text>
      <Hello name="Aigars" />
      <StatusBar style="auto" />
    </View>
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
