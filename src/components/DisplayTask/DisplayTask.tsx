import DisplayUnknownNumberAddition from "components/DisplayUnknownNumberAddition/DisplayUnknownNumberAddition";
import DisplayWrongAnswers from "components/DisplayWrongAnswers/DisplayWrongAnswers";
import MyButton from "components/MyButton/MyButton";
import useMissingNumberInputs from "hooks/useMissingNumberInputs";
import usePreviousState from "hooks/usePreviousState";
import { useEffect, useRef, useState, type FC, type RefObject } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { type EquationArgumentType, type TaskKindType } from "types/addition";
import createRefsArray from "utils/createRefsArray";
import handleNextInputFocus from "utils/handleNextInputFocus";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayTaskProps {
  kind: TaskKindType;
  tasks: EquationArgumentType[];
  handleNextLevelStep: () => void;
  changeTask: (kind: TaskKindType) => void;
}

const steps: TaskKindType[] = [
  "missingNumberAddition",
  "getResultOfAddition",
  "getResultOfSubtraction",
  "missingNumberSubtraction",
];

const DisplayTask: FC<DisplayTaskProps> = ({
  kind,
  tasks,
  changeTask,
  handleNextLevelStep,
}) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);

  const {
    inputs,
    isChecked,
    wrongAnswers,
    isAllAnswered,
    checkAnswers,
    setIsChecked,
    checkAnswersById,
    updateInputsValue,
    isAllAnsweredCorrectly,
  } = useMissingNumberInputs(tasks);

  const [currentStep, setCurrentStep] = useState<TaskKindType>(steps[0]);
  const [currentFocusedId, setCurrentFocusedId] = useState("");
  const prevFocusedId = usePreviousState(currentFocusedId);

  const isUnknownNumber =
    kind === "missingNumberAddition" ||
    kind === "getResultOfAddition" ||
    kind === "getResultOfSubtraction" ||
    kind === "missingNumberSubtraction";

  const handleNextStep = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = steps[nextStepIndex];

    setIsChecked(false);
    handleNextLevelStep();

    if (!nextStep) {
      changeTask(steps[0]);
      setCurrentStep(steps[0]);
      return;
    }

    changeTask(nextStep);
    setCurrentStep(nextStep);
  };

  const handleButtonState = () => {
    if (!isAllAnswered && !isChecked) {
      return {
        isDisabled: false,
        title: "Nākamais",
        function: () => handleNextInputFocus(taskRefs),
      };
    }

    if (isAllAnswered && !isChecked) {
      return {
        isDisabled: false,
        title: "Pārbaudīt",
        function: checkAnswers,
      };
    }

    return {
      isDisabled: false,
      title: "Nākamais uzdevums",
      function: handleNextStep,
    };
  };

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

            taskRefs.current = taskRef;
            const input = inputs[index];

            return (
              <DisplayUnknownNumberAddition
                task={item}
                input={input}
                isChecked={isChecked}
                handelOnFocus={(id) => {
                  setCurrentFocusedId(id);
                }}
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

      <DisplayWrongAnswers
        isChecked={isChecked}
        wrongAnswers={wrongAnswers}
        isAllAnsweredCorrectly={isAllAnsweredCorrectly}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingBottom: scalaDownDependingOnDevice(25),
          }}
        >
          <MyButton
            title={handleButtonState().title}
            isDisabled={handleButtonState().isDisabled}
            onPress={() => {
              handleButtonState().function();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default DisplayTask;
