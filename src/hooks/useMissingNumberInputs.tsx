import { selectionAsync } from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import { type EquationArgumentType } from "types/addition";
import { type InputType } from "types/common";
import findMissingNumber from "utils/findMissingNumber";
import isAdditionSubtractionAnswerCorrect from "utils/isAdditionSubtractionAnswerCorrect";

export type InputObjType = {
  [key: string]: InputType;
};

const useMissingNumberInputs = (tasks: EquationArgumentType[]) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputs, setInputs] = useState<InputObjType>({});
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [allAnswers, setAllAnswers] = useState<number[]>([]);
  const [initialInputs, setInitialInputs] = useState<InputObjType>({});

  const createInputs = useCallback(
    (tasks: EquationArgumentType[]) => {
      const inputs: InputObjType = {};
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        inputs[i] = {
          id: task.id,
          kind: task.kind,
          isAnswered: false,
          correct: "unknown",
          a: task.a || undefined,
          b: task.b || undefined,
          result: task.result || undefined,
        };
      }
      setInputs(inputs);
      setInitialInputs(inputs);
    },
    [tasks]
  );

  const checkAnswersById = (id: string) => {
    // loop over inputs and find input with key id value === id
    for (const key in inputs) {
      if (inputs[key].id === id) {
        const input = inputs[key];

        const answer = isAdditionSubtractionAnswerCorrect(input);

        if (answer === "correct") {
          selectionAsync();
        }

        const newInput = {
          ...input,
          correct: answer,
          isAnswered: answer === "correct",
        };

        setInputs((prev) => ({
          ...prev,
          [key]: newInput,
        }));
      }
    }
  };

  const checkIsAnswered = (inputs: InputObjType) => {
    for (const key in inputs) {
      const input = inputs[key];
      // check if all key values are not undefined
      if (
        input.a === undefined ||
        input.b === undefined ||
        input.result === undefined
      ) {
        return false;
      }
    }
    return true;
  };

  const updateInputsValue = ({
    input,
    index,
  }: {
    input: InputType;
    index: number;
  }) => {
    setInputs((prev) => ({
      ...prev,
      [index]: input,
    }));
  };

  const checkAnswers = () => {
    const newInputs = { ...inputs };
    const newWrongAnswers = [...allAnswers];

    for (const key in newInputs) {
      const input = newInputs[key];
      const answer = isAdditionSubtractionAnswerCorrect(input);

      newInputs[key] = {
        ...input,
        correct: answer,
        isAnswered: answer === "correct",
      };

      if (answer !== "correct") {
        setIsWrongAnswer(true);
      }

      const wrongAnswer = initialInputs[key];

      for (const ky in wrongAnswer) {
        const k = ky as keyof InputType;

        if (wrongAnswer[k] === undefined) {
          const missingNumber = findMissingNumber(wrongAnswer);

          if (missingNumber) {
            newWrongAnswers.push(missingNumber);
          }
        }
      }
    }

    setIsChecked(true);
    setInputs(newInputs);
    setAllAnswers(newWrongAnswers);
  };

  const isAllAnsweredCorrectly = (inputs: InputObjType) => {
    for (const key in inputs) {
      const input = inputs[key];
      if (input.correct !== "correct") {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setAllAnswers([]);
    createInputs(tasks);
    setIsWrongAnswer(false);
  }, [tasks]);

  return {
    inputs,
    isChecked,
    setIsChecked,
    checkAnswers,
    allAnswers,
    isWrongAnswer,
    checkAnswersById,
    updateInputsValue,
    isAllAnswered: checkIsAnswered(inputs),
    isAllAnsweredCorrectly: isAllAnsweredCorrectly(inputs),
    isInputChanged: JSON.stringify(initialInputs) !== JSON.stringify(inputs),
  };
};

export default useMissingNumberInputs;
