import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import MyButton from "components/MyButton/MyButton";
import useMissingNumberInputs from "hooks/useMissingNumberInputs";
import { useRef, type FC, type RefObject, useState, useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import { type EquationArgumentType, type TaskKindType } from "types/addition";
import createRefsArray from "utils/createRefsArray";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayTaskProps {
  kind: TaskKindType;
  tasks: EquationArgumentType[];
  changeTask: (kind: TaskKindType) => void;
}

const DisplayTask: FC<DisplayTaskProps> = ({ kind, tasks, changeTask }) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);
  const {
    inputs,
    isChecked,
    setIsChecked,
    checkAnswers,
    updateInputsValue,
    checkAnswersById,
  } = useMissingNumberInputs(tasks);

  const prevFocusedId = useRef("");
  const [currentFocusedId, setCurrentFocusedId] = useState("");

  const isUnknownNumber = kind === "missingNumber" || kind === "getResult";

  useEffect(() => {
    // On first render prevFocusedId.current is undefined
    if (!prevFocusedId.current) {
      prevFocusedId.current = currentFocusedId;
      return;
    }

    // check if previous input is answered correctly
    checkAnswersById(prevFocusedId.current);
    prevFocusedId.current = currentFocusedId;
  }, [currentFocusedId]);

  return (
    <>
      {isUnknownNumber && (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const taskRef = createRefsArray<TextInput>({
              refs: taskRefs,
              length: tasks.length,
            });

            const input = inputs[index];

            return (
              <DisplayUnknownNumberAddition
                task={item}
                input={input}
                handelOnFocus={(id) => {
                  setCurrentFocusedId(id);
                }}
                ref={taskRef[index]}
                isChecked={isChecked}
                sequenceNumber={index}
                updateInputsValue={(value) => {
                  updateInputsValue({
                    index,
                    input: value,
                  });
                }}
              />
            );
          }}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingBottom: scalaDownDependingOnDevice(25),
          }}
        >
          <MyButton
            title={isChecked ? "Nākamais" : "Pārbaudīt"}
            onPress={() => {
              if (!isChecked) {
                checkAnswers();
                return;
              }

              setIsChecked(false);
              changeTask(
                kind === "missingNumber" ? "getResult" : "missingNumber"
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default DisplayTask;
