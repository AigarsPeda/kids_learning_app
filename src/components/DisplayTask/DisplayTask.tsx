import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import MyButton from "components/MyButton/MyButton";
import { FC, RefObject, useEffect, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import { MissingNumberTaskType, TaskKindType } from "types/addition";
import createRefsArray from "utils/createRefsArray";
import { scalaDownDependingOnDevice } from "utils/metrics";
import useMissingNumberInputs from "../../hooks/useMissingNumberInputs";
import isMissingNumberAnswerCorrect from "../../utils/isMissingNumberAnswerCorrect";

interface DisplayTaskProps {
  kind: TaskKindType;
  tasks: MissingNumberTaskType[];
}

const DisplayTask: FC<DisplayTaskProps> = ({ kind, tasks }) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);
  const { inputs, updateInputsValue, checkIfAnswerIsCorrect } =
    useMissingNumberInputs(tasks);

  return (
    <>
      {kind === "missingNumber" && (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const taskRef = createRefsArray<TextInput>({
              refs: taskRefs,
              length: tasks.length,
            });

            return (
              <DisplayUnknownNumberAddition
                task={item}
                ref={taskRef[index]}
                input={inputs[index]}
                sequenceNumber={index}
                correct={isMissingNumberAnswerCorrect(inputs[index] || {})}
                updateInputsValue={(value) => {
                  updateInputsValue({
                    index,
                    text: value,
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
            title="Nākamais"
            onPress={() => {
              console.log("next");
              // setTaskKind("missingNumber");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default DisplayTask;
