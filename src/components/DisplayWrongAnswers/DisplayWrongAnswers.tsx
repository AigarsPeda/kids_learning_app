import useColors from "hooks/useStyles";
import { useCallback, useEffect, useRef, type FC } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Text,
  View,
  // Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { device, scalaDownDependingOnDevice } from "utils/metrics";
import Modal from "react-native-modal";
import MyButton from "../MyButton/MyButton";

interface DisplayWrongAnswersProps {
  isChecked: boolean;
  wrongAnswers: number[];
  handleNextTask: () => void;
  // isAllAnsweredCorrectly: boolean;
}

const DisplayWrongAnswers: FC<DisplayWrongAnswersProps> = ({
  isChecked,
  wrongAnswers,
  handleNextTask,
  // isAllAnsweredCorrectly,
}) => {
  const { colors } = useColors();
  const translateAnimations = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.timing(translateAnimations, {
      toValue: 1,
      delay: 320,
      duration: 600,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1)),
    }).start();
  }, [translateAnimations]);

  const resetAnimation = useCallback(() => {
    Animated.timing(translateAnimations, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [translateAnimations]);

  useEffect(() => {
    if (isChecked) {
      startAnimation();
    }

    return () => {
      resetAnimation();
    };
  }, [isChecked, startAnimation]);

  return (
    <View style={styles.centeredView}>
      <Modal
        // transparent={true}
        // animationType="slide"
        isVisible={Boolean(wrongAnswers.length !== 0)}
        // onDismiss={() => {
        //   handleNextTask();
        // }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={750}
        backdropColor="rgba(16, 24, 39, 0.300)"
        style={{
          margin: 0,
          // backgroundColor: "rgba(16, 24, 39, 0.000)",
        }}
      >
        <TouchableOpacity
          onPress={handleNextTask}
          style={{
            ...styles.centeredView,
          }}
        >
          <View
            style={{
              ...styles.modalView,
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: colors.incorrect,
                  fontSize: scalaDownDependingOnDevice(25),
                  paddingBottom: scalaDownDependingOnDevice(4),
                }}
              >
                Nepareizi! 😔
              </Text>

              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: colors.incorrect,
                    fontSize: scalaDownDependingOnDevice(20),
                  }}
                >
                  Pareizās atbildes:
                </Text>
                <FlatList
                  data={wrongAnswers}
                  numColumns={3}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
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
              <View
                style={{
                  paddingTop: scalaDownDependingOnDevice(20),
                }}
              >
                <MyButton title="Sapratu" onPress={handleNextTask} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // backgroundColor: "rgba(16, 24, 39, 0.200)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    width: device.width,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DisplayWrongAnswers;
