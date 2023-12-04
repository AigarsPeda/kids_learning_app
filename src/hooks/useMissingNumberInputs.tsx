import { selectionAsync } from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import { type EquationArgumentType } from "types/addition";
import { type InputType } from "types/common";
import isAdditionSubtractionAnswerCorrect from "utils/isAdditionSubtractionAnswerCorrect";

// adding key correct to input object with type AnswerType

export type InputObjType = {
  [key: string]: InputType;
};

const useMissingNumberInputs = (tasks: EquationArgumentType[]) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputs, setInputs] = useState<InputObjType>({});

  const createInputs = useCallback(
    (tasks: EquationArgumentType[]) => {
      const inputs: InputObjType = {};
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        inputs[i] = {
          id: task.id,
          isAnswered: false,
          correct: "unknown",
          a: task.a || undefined,
          b: task.b || undefined,
          result: task.result || undefined,
          kind: task.kind,
        };
      }
      setInputs(inputs);
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
          console.log("correct");
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

  const updateInputsValue = ({
    input,
    index,
  }: {
    input: InputType;
    index: number;
  }) => {
    // const answer = isAdditionSubtractionAnswerCorrect(input);

    const newInput = {
      ...input,
      // correct: answer,
      // isAnswered: answer === "correct",
    };

    setInputs((prev) => ({
      ...prev,
      [index]: newInput,
    }));
  };

  const checkAnswers = () => {
    setIsChecked(true);

    setInputs((prev) => {
      const newInputs = { ...prev };
      for (const key in newInputs) {
        const input = newInputs[key];
        const answer = isAdditionSubtractionAnswerCorrect(input);

        newInputs[key] = {
          ...input,
          correct: answer,
          isAnswered: answer === "correct",
        };
      }

      return newInputs;
    });
  };

  useEffect(() => {
    createInputs(tasks);
  }, [tasks]);

  return {
    inputs,
    isChecked,
    setIsChecked,
    checkAnswers,
    checkAnswersById,
    updateInputsValue,
  };
};

export default useMissingNumberInputs;
