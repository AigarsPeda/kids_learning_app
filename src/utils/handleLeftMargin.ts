import leftOrRightMargin from "utils/leftOrRightMargin";
import { scalaDownDependingOnDevice } from "utils/metrics";

let currentLeftMargin = 0;

const handleLeftMargin = (
  index: number,
  margin: number,
  brakePoint: number
) => {
  currentLeftMargin =
    leftOrRightMargin(index, brakePoint) === "left"
      ? currentLeftMargin + margin
      : currentLeftMargin - margin;

  const startLeftMargin = scalaDownDependingOnDevice(currentLeftMargin);

  return startLeftMargin;
};

export default handleLeftMargin;
