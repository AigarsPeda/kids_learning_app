import { type InputType } from "types/common";
import getMissingNumberAddition from "utils/getMissingNumberAddition";
import getMissingNumberSubtraction from "utils/getMissingNumberSubtraction";

const findMissingNumber = (input: InputType) => {
  if (
    input.kind === "getResultOfAddition" ||
    input.kind === "missingNumberAddition"
  ) {
    return getMissingNumberAddition(input);
  }

  if (
    input.kind === "getResultOfSubtraction" ||
    input.kind === "missingNumberSubtraction"
  ) {
    return getMissingNumberSubtraction(input);
  }
};

export default findMissingNumber;
