import Confetti from "components/Confetti/Confetti";
import DisplayAnswers from "components/DisplayAnswers/DisplayAnswers";
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
import handleNextInputFocus from "utils/handleNextInputFocus";
import { scalaDownDependingOnDevice } from "utils/metrics";

interface DisplayTaskProps {
  kind: TaskKindType;
  tasks: EquationArgumentType[];
  getNewTasks: () => void;
  decrementLives: () => void;
  changeTask: (kind: TaskKindType) => void;
  handleSavingCurrentLevelProgress: () => void;
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
  getNewTasks,
  decrementLives,
  handleSavingCurrentLevelProgress,
}) => {
  const taskRefs = useRef<RefObject<TextInput>[]>([]);

  const {
    inputs,
    isChecked,
    allAnswers,
    isAllAnswered,
    isWrongAnswer,
    checkAnswers,
    setIsChecked,
    checkAnswersById,
    updateInputsValue,
  } = useMissingNumberInputs(tasks);

  const [currentStep, setCurrentStep] = useState<TaskKindType>(steps[0]);
  const [currentFocusedId, setCurrentFocusedId] = useState("");
  const prevFocusedId = usePreviousState(currentFocusedId);

  const isConfetti = !isWrongAnswer && isAllAnswered && isChecked;

  const isUnknownNumber =
    kind === "missingNumberAddition" ||
    kind === "getResultOfAddition" ||
    kind === "getResultOfSubtraction" ||
    kind === "missingNumberSubtraction";

  const handleNextStep = () => {
    const currentStepIndex = steps.indexOf(currentStep);
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = steps[nextStepIndex] || steps[0];

    if (isWrongAnswer) {
      getNewTasks();
      decrementLives();
    }

    // save if no wrong answers
    if (!isWrongAnswer) {
      changeTask(nextStep);
      setCurrentStep(nextStep);
      handleSavingCurrentLevelProgress();
    }

    setIsChecked(false);
  };

  const handleButtonState = () => {
    if (isAllAnswered && !isChecked) {
      return {
        isDisabled: false,
        title: "Pārbaudīt",
        function: () => {
          checkAnswers();
        },
      };
    }

    if (isAllAnswered && isChecked) {
      return {
        isDisabled: false,
        title: "Nākamais uzdevums",
        function: handleNextStep,
      };
    }

    return {
      isDisabled: false,
      title: "Nākamais",
      function: () => handleNextInputFocus(taskRefs),
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

      {isWrongAnswer && (
        <DisplayAnswers
          allAnswers={allAnswers}
          handleNextTask={handleNextStep}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          marginBottom: scalaDownDependingOnDevice(20),
        }}
      >
        {isConfetti && <Confetti />}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: scalaDownDependingOnDevice(15),
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
