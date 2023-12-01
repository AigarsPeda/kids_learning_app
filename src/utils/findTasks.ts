import { MATH_TASK_EXPLANATION, MATH_TASKS } from "tasks/math";
import { MathObjKeysType, TaskKindType } from "types/addition";
import getRandomTask from "utils/getRandomTask";

interface FindTasksType {
  countOfItems: number;
  taskKind: TaskKindType;
  difficulty: MathObjKeysType;
}

const findTasks = ({ taskKind, difficulty, countOfItems }: FindTasksType) => {
  return {
    description: MATH_TASK_EXPLANATION[taskKind],
    tasks: getRandomTask({
      countOfItems,
      allItems: MATH_TASKS[difficulty][taskKind].tasks,
    }),
  };
};

export default findTasks;
