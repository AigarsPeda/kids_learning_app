import { useCallback, useEffect, useState } from "react";
import { type EquationArgumentType } from "types/addition";
import { type InputType, type MissingNumberInputType } from "types/common";
import isMissingNumberAnswerCorrect from "utils/isMissingNumberAnswerCorrect";

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
        };
      }
      setInputs(inputs);
    },
    [tasks]
  );

  const updateInputsValue = ({
    input,
    index,
  }: {
    input: MissingNumberInputType;
    index: number;
  }) => {
    const answer = isMissingNumberAnswerCorrect(input);

    const newInput = {
      ...input,
      correct: answer,
      isAnswered: answer === "correct",
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
        const answer = isMissingNumberAnswerCorrect(input);

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
    updateInputsValue,
  };
};

export default useMissingNumberInputs;