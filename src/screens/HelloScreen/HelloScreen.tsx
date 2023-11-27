import Hello from "@components/Hello/Hello";
import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface HelloScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HelloScreen: FC<HelloScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DifferentScreen")}
      />
      <Text>Hello World!</Text>
      <Hello name="Aigars" />
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

export default HelloScreen;
