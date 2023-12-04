import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import MyButton from "components/MyButton/MyButton";
import useMissingNumberInputs from "hooks/useMissingNumberInputs";
import usePreviousState from "hooks/usePreviousState";
import { useEffect, useRef, useState, type FC, type RefObject } from "react";
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

const steps: TaskKindType[] = [
  "missingNumberAddition",
  "getResultOfAddition",
  "getResultOfSubtraction",
  "missingNumberSubtraction",
];

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

  const [currentStep, setCurrentStep] = useState<TaskKindType>(steps[0]);
  const [currentFocusedId, setCurrentFocusedId] = useState("");
  const prevFocusedId = usePreviousState(currentFocusedId);

  const isUnknownNumber =
    kind === "missingNumberAddition" ||
    kind === "getResultOfAddition" ||
    kind === "getResultOfSubtraction" ||
    kind === "missingNumberSubtraction";

  useEffect(() => {
    if (!prevFocusedId) {
      return;
    }
    checkAnswersById(prevFocusedId);
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

              const currentStepIndex = steps.indexOf(currentStep);
              const nextStepIndex = currentStepIndex + 1;
              const nextStep = steps[nextStepIndex];

              if (!nextStep) {
                changeTask(steps[0]);
                setCurrentStep(steps[0]);
                return;
              }

              changeTask(nextStep);
              setCurrentStep(nextStep);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default DisplayTask;
