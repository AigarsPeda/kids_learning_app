import { useCallback, useEffect, useState } from "react";
import { MissingNumberTaskType } from "types/addition";
import { AnswerType, MissingNumberInputType } from "types/common";
import isMissingNumberAnswerCorrect from "../utils/isMissingNumberAnswerCorrect";

// adding key correct to input object with type AnswerType
type InputType = MissingNumberInputType & { correct: AnswerType };

type InputObjType = {
  [key: string]: InputType;
};

const useMissingNumberInputs = (tasks: MissingNumberTaskType[]) => {
  const [inputs, setInputs] = useState<InputObjType>({});

  const createInputs = useCallback(
    (tasks: MissingNumberTaskType[]) => {
      const inputs: InputObjType = {};
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        inputs[i] = {
          correct: "unknown",
          a: task.data.a || undefined,
          b: task.data.b || undefined,
          result: task.data.result || undefined,
        };
      }
      setInputs(inputs);
    },
    [tasks]
  );

  const checkIfAnswerIsCorrect = ({ index }: { index: number }) => {
    const input = inputs[index];
    const isCorrect = isMissingNumberAnswerCorrect(input);
    setInputs((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        correct: isCorrect,
      },
    }));
  };

  const updateInputsValue = ({
    text,
    index,
  }: {
    text: MissingNumberInputType;
    index: number;
  }) => {
    setInputs((prev) => ({
      ...prev,
      [index]: text,
    }));
  };

  useEffect(() => {
    createInputs(tasks);
  }, [tasks]);

  return {
    inputs,
    updateInputsValue,
    checkIfAnswerIsCorrect,
  };
};

export default useMissingNumberInputs;
