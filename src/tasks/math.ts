import { MathObjType, MathTaskExplanationType } from "types/addition";
import FIRST_TASKS from "./first_tasks";
import SECOND_TASKS from "./second_tasks";
import THIRDS_TASKS from "./third_task";

export const MATH_TASKS: MathObjType = {
  "1": FIRST_TASKS,
  "2": SECOND_TASKS,
  "3": THIRDS_TASKS,
};

export const AVAILABLE_LEVEL_COUNT = Object.keys(MATH_TASKS).length * 10;

export const MATH_TASK_EXPLANATION: MathTaskExplanationType = {
  getResultOfAddition: "Atrisini vienādojumu",
  getResultOfSubtraction: "Atrisini vienādojumu",
  missingNumberAddition: "Atrodi nezināmo skaitli",
  missingNumberSubtraction: "Atrodi nezināmo skaitli",
};
