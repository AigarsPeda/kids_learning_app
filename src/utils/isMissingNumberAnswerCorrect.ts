import { type AnswerType, type MissingNumberInputType } from "types/common";

const isMissingNumberAnswerCorrect = ({
  a,
  b,
  result,
}: MissingNumberInputType): AnswerType => {
  if (a && b && result) {
    return a + b === result ? "correct" : "incorrect";
  }

  return "unknown";
};

export default isMissingNumberAnswerCorrect;
