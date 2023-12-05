import DisplayTask from "components/DisplayTask/DisplayTask";
import useColors from "hooks/useColors";
import useTasks from "hooks/useTasks";
import { type FC } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HomeScreenProps {
  navigation: { navigate: (arg0: string) => void };
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useColors();
  const { tasks, taskKind, timePassed, resetLevel, setTaskKind } = useTasks();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colors.background,
      }}
    >
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("DifferentScreen")}
      />

      {timePassed ? (
        <View
          style={{
            ...styles.headLine,
            backgroundColor: colors.accentBackground,
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              ...styles.headLine,
              color: colors.text,
            }}
          >
            Level Completed
          </Text>
          <Text
            style={{
              ...styles.headLine,
              color: colors.text,
            }}
          >
            {timePassed}
          </Text>
          <Button
            title="Next Level"
            onPress={() => {
              resetLevel();
            }}
          />
        </View>
      ) : (
        <>
          <Text
            style={{
              ...styles.headLine,
              color: colors.text,
            }}
          >
            {tasks.description}
          </Text>

          <DisplayTask
            kind={taskKind}
            tasks={tasks.tasks}
            changeTask={setTaskKind}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
  headLine: {
    margin: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeScreen;
