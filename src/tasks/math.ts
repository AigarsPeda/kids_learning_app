import { MathObjType, MathTaskExplanationType } from "types/addition";
import FIRST_TASKS from "./first_tasks";
import SECOND_TASKS from "./second_tasks";

export const MATH_TASKS: MathObjType = {
  "1": FIRST_TASKS,
  "2": SECOND_TASKS,
};

export const MATH_TASK_EXPLANATION: MathTaskExplanationType = {
  getResultOfAddition: "Atrisini vienādojumu",
  getResultOfSubtraction: "Atrisini vienādojumu",
  missingNumberAddition: "Atrodi nezināmo skaitli",
  missingNumberSubtraction: "Atrodi nezināmo skaitli",
};
