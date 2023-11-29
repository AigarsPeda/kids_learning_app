import { EquationArgumentType } from "types/addition";
import { AnswerType } from "types/common";

const isMissingNumberAnswerCorrect = ({
  a,
  b,
  result,
}: EquationArgumentType): AnswerType => {
  if (a && b && result) {
    return a + b === result ? "correct" : "incorrect";
  }

  return "unknown";
};

export default isMissingNumberAnswerCorrect;
