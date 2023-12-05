import useColors from "hooks/useColors";
import { FC } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayWrongAnswersProps {
  isChecked: boolean;
  wrongAnswers: number[];
  isAllAnsweredCorrectly: boolean;
}

const DisplayWrongAnswers: FC<DisplayWrongAnswersProps> = ({
  isChecked,
  wrongAnswers,
  isAllAnsweredCorrectly,
}) => {
  const { colors } = useColors();

  return (
    <SafeAreaView
      style={{
        width: "100%",
        backgroundColor: colors.accentBackground,
        marginBottom: scalaDownDependingOnDevice(10),
        paddingVertical: scalaDownDependingOnDevice(10),
        paddingHorizontal: scalaDownDependingOnDevice(70),
      }}
    >
      {isChecked && (
        <>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: scalaDownDependingOnDevice(25),
              paddingBottom: scalaDownDependingOnDevice(4),
              color: isAllAnsweredCorrectly ? colors.correct : colors.incorrect,
            }}
          >
            {isAllAnsweredCorrectly ? "Viss pareizi!" : "Nepareizi!"}
          </Text>
        </>
      )}
      {!isAllAnsweredCorrectly && isChecked && (
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: colors.accentBackground,
          }}
        >
          <Text
            style={{
              color: colors.incorrect,
              fontSize: scalaDownDependingOnDevice(20),
              paddingRight: scalaDownDependingOnDevice(10),
            }}
          >
            Pareizās atbildes:
          </Text>
          <FlatList
            data={wrongAnswers}
            numColumns={wrongAnswers.length}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: colors.accentBackground,
            }}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => {
              const isFirstItem = index === 0;
              const isLastItem = index === wrongAnswers.length - 1;
              return (
                <Text
                  style={{
                    color: colors.incorrect,
                    fontSize: scalaDownDependingOnDevice(20),
                    paddingLeft: isFirstItem
                      ? 0
                      : scalaDownDependingOnDevice(4),
                  }}
                >
                  {item}
                  {!isLastItem && ","}
                </Text>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DisplayWrongAnswers;
