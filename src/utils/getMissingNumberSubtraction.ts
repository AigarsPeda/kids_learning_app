import { type InputType } from "types/common";

const getMissingNumberSubtraction = (input: InputType) => {
  const { a, b, result } = input;

  if (a === undefined && result && b) {
    return result + b;
  }

  if (b === undefined && result && a) {
    return a - result;
  }

  if (result === undefined && a && b) {
    return a - b;
  }
};

export default getMissingNumberSubtraction;
