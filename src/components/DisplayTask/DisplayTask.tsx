import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import MyButton from "components/MyButton/MyButton";
import useMissingNumberInputs from "hooks/useMissingNumberInputs";
import { useRef, type FC, type RefObject } from "react";
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
}

const DisplayTask: FC<DisplayTaskProps> = ({ kind, tasks }) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);
  const { inputs, updateInputsValue } = useMissingNumberInputs(tasks);

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

            const input = inputs[index];

            return (
              <DisplayUnknownNumberAddition
                task={item}
                input={input}
                ref={taskRef[index]}
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
