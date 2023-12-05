import { MathTasksType } from "types/addition";

const getTasksSign = (kind: keyof MathTasksType) => {
  switch (kind) {
    case "getResultOfAddition":
      return "+";

    case "missingNumberAddition":
      return "+";

    case "getResultOfSubtraction":
      return "-";

    case "missingNumberSubtraction":
      return "-";
  }
};

export default getTasksSign;
