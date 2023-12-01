import { useEffect, useState } from "react";
import {
  type EquationArgumentType,
  type MathObjKeysType,
  type TaskKindType,
} from "types/addition";
import findTasks from "utils/findTasks";

const useTasks = () => {
  const [difficulty, setDifficulty] = useState<MathObjKeysType>("easy");
  const [taskKind, setTaskKind] = useState<TaskKindType>("missingNumber");
  const [tasks, setTasks] = useState<{
    description: string;
    tasks: EquationArgumentType[];
  }>({
    tasks: [],
    description: "No description",
  });

  useEffect(() => {
    setTasks(
      findTasks({
        taskKind,
        countOfItems: 3,
        difficulty: difficulty,
      })
    );
  }, [difficulty, taskKind]);

  return {
    tasks,
    taskKind,
    setTaskKind,
    setDifficulty,
  };
};

export default useTasks;
