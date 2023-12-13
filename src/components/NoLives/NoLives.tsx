import useStyles from "hooks/useStyles";
import { FC } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

interface NoLivesProps {
  goHome: () => void;
}

const NoLives: FC<NoLivesProps> = ({ goHome }) => {
  const { colors, typography } = useStyles();
  return (
    <View
      style={{
        ...styles.headLine,
        padding: 16,
        // borderRadius: 8,
        // backgroundColor: colors.accentBackground,
      }}
    >
      <Text
        style={{
          ...styles.headLine,
          color: colors.text,
        }}
      >
        No Lives Left
      </Text>
      <Button title="Atpakaļ uz sākumu" onPress={goHome} />
    </View>
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
  },
});

export default NoLives;
