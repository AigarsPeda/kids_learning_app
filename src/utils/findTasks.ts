import { MATH_TASK_EXPLANATION, MATH_TASKS } from "tasks/math";
import { MathObjKeysType, TaskKindType } from "types/addition";
import getRandomTask from "utils/getRandomTask";

const findTasks = (lev: MathObjKeysType, taskK: TaskKindType) => {
  switch (lev) {
    case "easy":
      return {
        description: MATH_TASK_EXPLANATION[taskK],
        tasks: getRandomTask({
          countOfItems: 3,
          allItems: MATH_TASKS.easy[taskK].tasks,
        }),
      };

    //   // case "medium":
    //   //   return MATH_TASKS.medium.tasks;
    default:
      return {
        description: "No description",
        tasks: getRandomTask({
          countOfItems: 3,
          allItems: MATH_TASKS.easy[taskK].tasks,
        }),
      };
  }
};

export default findTasks;
