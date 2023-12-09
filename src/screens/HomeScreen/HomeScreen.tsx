import RoundButton from "components/RoundButton/RoundButton";
import useStyles from "hooks/useStyles";
import { useState, type FC } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import { type LevelScreenPropsType } from "types/screen";
import handleLeftMargin from "utils/handleLeftMargin";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface LevelScreenProps {
  navigation: {
    // navigate: (arg0: string, arg1: { otherParam: string }) => void;
    navigate: (arg0: string, arg1: LevelScreenPropsType) => void;
  };
}

const HomeScreen: FC<LevelScreenProps> = ({ navigation }) => {
  const [level, setLevel] = useState("1");
  const { colors, typography } = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);

  const createArray = (length: number) => [...Array(length)];

  const array = createArray(20);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        marginTop: StatusBar.currentHeight || 0,
      }}
    >
      <View
        style={{
          padding: 16,
          width: "100%",
          elevation: 15,
          shadowRadius: 2,
          shadowColor: colors.lightGray,
          backgroundColor: colors.background,
          shadowOpacity: isScrolled ? 0.3 : 0,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontFamily: typography.primaryMediumFont,
            fontSize: scalaDownDependingOnDevice(40),
          }}
        >
          Choose Level
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          data={array}
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            // Check the value of offsetY to determine if the FlatList is scrolled
            if (offsetY > 0) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const isFirst = index === 0;
            const rotateAngle = index % 2 === 0 ? 10 : -10;
            const isLast = array.length - 1 === index;

            return (
              <View
                style={{
                  marginLeft: handleLeftMargin(index, 32, 5),
                  marginTop: isFirst
                    ? scalaDownDependingOnDevice(25)
                    : scalaDownDependingOnDevice(105),
                  marginBottom: isLast ? scalaDownDependingOnDevice(170) : 0,
                }}
              >
                <RoundButton
                  isSelected={level === (index + 1).toString()}
                  isDisabled={level !== (index + 1).toString()}
                  rotateAngle={rotateAngle}
                  title={(index + 1).toString()}
                  onPress={() =>
                    navigation.navigate("LevelScreen", {
                      level: (index + 1).toString(),
                    })
                  }
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
