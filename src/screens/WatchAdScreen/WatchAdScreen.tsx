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

const WatchAdScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
