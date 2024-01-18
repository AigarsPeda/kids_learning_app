import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

interface WatchAdScreenProps {
  navigation: {
    navigate: (arg: string) => void;
  };
}

const WatchAdScreen: FC<WatchAdScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const { colors, typography } = useStyles();
  const [content, setContent] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />

      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default WatchAdScreen;
