import { selectionAsync } from "expo-haptics";
import { useCallback, useEffect, useState } from "react";
import { type EquationArgumentType } from "types/addition";
import { type InputType } from "types/common";
import isAdditionSubtractionAnswerCorrect from "utils/isAdditionSubtractionAnswerCorrect";

export type InputObjType = {
  [key: string]: InputType;
};

const useMissingNumberInputs = (tasks: EquationArgumentType[]) => {
  const [isChecked, setIsChecked] = useState(false);
  const [inputs, setInputs] = useState<InputObjType>({});
  const [initialInputs, setInitialInputs] = useState<InputObjType>({});

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
      if (!input.a || !input.b || !input.result) {
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
    // const answer = isAdditionSubtractionAnswerCorrect(input);

    const newInput = {
      ...input,
      // correct: answer,
      // isAnswered: answer === "correct",
    };

    // setIsAllAnswered(checkIsAnswered(inputs));

    setInputs((prev) => ({
      ...prev,
      [index]: newInput,
    }));
  };

  const checkAnswers = () => {
    console.log("checkAnswers");

    const newInputs = { ...inputs };

    for (const key in newInputs) {
      const input = newInputs[key];
      const answer = isAdditionSubtractionAnswerCorrect(input);

      newInputs[key] = {
        ...input,
        correct: answer,
        isAnswered: answer === "correct",
      };
    }

    setInputs(newInputs);
    setIsChecked(true);

    // setInputs((prev) => {
    //   const newInputs = { ...prev };
    //   for (const key in newInputs) {
    //     const input = newInputs[key];
    //     const answer = isAdditionSubtractionAnswerCorrect(input);

    //     newInputs[key] = {
    //       ...input,
    //       correct: answer,
    //       isAnswered: answer === "correct",
    //     };
    //   }

    //   return newInputs;
    // });
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
    isAllAnswered: checkIsAnswered(inputs),
    isInputChanged: JSON.stringify(initialInputs) !== JSON.stringify(inputs),
  };
};

export default useMissingNumberInputs;
