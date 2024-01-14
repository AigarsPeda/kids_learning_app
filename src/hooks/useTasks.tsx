import { LEVEL_SETTINGS } from "hardcoded";
import { useCallback, useEffect, useState } from "react";
import {
  type EquationArgumentType,
  type MathObjKeysType,
  type TaskKindType,
} from "types/addition";
import findTasks from "utils/findTasks";

// create types guard
const isMathObjKeysType = (obj: any): obj is MathObjKeysType => {
  return typeof obj === "string";
};

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

  // get difficulty based on level on every 10th level difficulty increases
  const getDifficulty = (level: number): MathObjKeysType => {
    const difficulty = (
      Math.floor(level / LEVEL_SETTINGS.increaseLevelEvery) + 1
    ).toString();

    console.log("difficulty", difficulty);

    if (isMathObjKeysType(difficulty)) {
      return difficulty;
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
