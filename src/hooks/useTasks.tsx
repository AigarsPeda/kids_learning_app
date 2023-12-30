import { useCallback, useEffect, useState } from "react";
import {
  type EquationArgumentType,
  type MathObjKeysType,
  type TaskKindType,
} from "types/addition";
import findTasks from "utils/findTasks";

const useTasks = (level: number) => {
  const [taskKind, setTaskKind] = useState<TaskKindType>(
    "missingNumberAddition"
  );
  const [tasks, setTasks] = useState<{
    description: string;
    tasks: EquationArgumentType[];
  }>({
    tasks: [],
    description: "No description",
  });

  const getDifficulty = (level: number): MathObjKeysType => {
    if (level <= 10) {
      return "1";
    }

    if (level > 10 && level <= 20) {
      return "2";
    }

    return "1";
  };

  const getNewTasks = useCallback(() => {
    setTasks(
      findTasks({
        taskKind,
        countOfItems: 3,
        difficulty: getDifficulty(level),
      })
    );
  }, [taskKind, level]);

  useEffect(() => {
    getNewTasks();
  }, [getNewTasks]);

  return {
    tasks,
    taskKind,
    setTaskKind,
    getNewTasks,
  };
};

export default useTasks;
