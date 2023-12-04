import { type AnswerType, type InputType } from "types/common";
import checkAddition from "utils/checkAddition";
import checkSubtraction from "utils/checkSubtraction";

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
    return checkAddition(a, b, result) ? "correct" : "incorrect";
  }

  if (
    kind === "getResultOfSubtraction" ||
    kind === "missingNumberSubtraction"
  ) {
    return checkSubtraction(a, b, result) ? "correct" : "incorrect";
  }

  return "unknown";
};

export default isAdditionSubtractionAnswerCorrect;
