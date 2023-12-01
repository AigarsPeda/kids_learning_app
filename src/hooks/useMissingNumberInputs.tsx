import { useCallback, useEffect, useState } from "react";
import { type EquationArgumentType } from "types/addition";
import { type InputType, type MissingNumberInputType } from "types/common";
import isMissingNumberAnswerCorrect from "utils/isMissingNumberAnswerCorrect";

// adding key correct to input object with type AnswerType

export type InputObjType = {
  [key: string]: InputType;
};

const useMissingNumberInputs = (tasks: EquationArgumentType[]) => {
  const [inputs, setInputs] = useState<InputObjType>({});

  const createInputs = useCallback(
    (tasks: EquationArgumentType[]) => {
      const inputs: InputObjType = {};
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        inputs[i] = {
          id: task.id,
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
    const newInput = {
      ...input,
      correct: isMissingNumberAnswerCorrect(input),
    };

    setInputs((prev) => ({
      ...prev,
      [index]: newInput,
    }));
  };

  useEffect(() => {
    createInputs(tasks);
  }, [tasks]);

  return {
    inputs,
    updateInputsValue,
  };
};

export default useMissingNumberInputs;
