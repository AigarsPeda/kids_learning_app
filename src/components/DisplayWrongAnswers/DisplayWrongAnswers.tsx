import MyButton from "components/MyButton/MyButton";
import useColors from "hooks/useStyles";
import { useEffect, useState, type FC } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { device, scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayWrongAnswersProps {
  wrongAnswers: number[];
  handleNextTask: () => void;
}

const DisplayWrongAnswers: FC<DisplayWrongAnswersProps> = ({
  wrongAnswers,
  handleNextTask,
}) => {
  const { colors } = useColors();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (Boolean(wrongAnswers.length !== 0)) {
      setIsModalVisible(true);
    }
  }, [wrongAnswers]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropColor="rgba(16, 24, 39, 0.300)"
        isVisible={isModalVisible}
        onModalHide={() => {
          handleNextTask();
        }}
        style={{
          margin: 0,
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
                <MyButton
                  title="Sapratu"
                  onPress={() => {
                    setIsModalVisible(false);
                    // setTimeout(() => {
                    //   handleNextTask();
                    // }, 300);
                  }}
                />
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
    elevation: 5,
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
});

export default DisplayWrongAnswers;
