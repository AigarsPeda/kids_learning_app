import { type FC } from "react";
import { View, Text, StyleSheet } from "react-native";

const DifferentScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Different Screen</Text>
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

export default DifferentScreen;
