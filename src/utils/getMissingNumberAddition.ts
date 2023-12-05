import { type InputType } from "types/common";

const getMissingNumberAddition = (input: InputType) => {
  const { a, b, result } = input;

  if (a === undefined && result && b) {
    return result - b;
  }

  if (b === undefined && result && a) {
    return result - a;
  }

  if (result === undefined && a && b) {
    return a + b;
  }
};

export default getMissingNumberAddition;
