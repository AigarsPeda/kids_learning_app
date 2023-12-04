import { InputType, type AnswerType } from "types/common";

const isAdditionSubtractionAnswerCorrect = ({
  a,
  b,
  result,
  kind,
}: InputType): AnswerType => {
  if (a === undefined || b === undefined || result === undefined) {
    return "unknown";
  }

  if (kind === "missingNumberAddition" || kind === "getResultOfAddition") {
    return a + b === result ? "correct" : "incorrect";
  }

  if (
    kind === "getResultOfSubtraction" ||
    kind === "missingNumberSubtraction"
  ) {
    console.log(a, b, result);
    return a - b === result ? "correct" : "incorrect";
  }

  return "unknown";
};

export default isAdditionSubtractionAnswerCorrect;
