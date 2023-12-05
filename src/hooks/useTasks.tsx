import { TASK_COUNT_PER_LEVEL } from "hardcoded";
import { useEffect, useRef, useState } from "react";
import {
  type EquationArgumentType,
  type MathObjKeysType,
  type TaskKindType,
} from "types/addition";
import findTasks from "utils/findTasks";
import getMinHoursPassed from "utils/getMinHoursPassed";

const useTasks = () => {
  const startTimer = useRef<Date | null>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [difficulty, setDifficulty] = useState<MathObjKeysType>("easy");
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

  const resetLevel = () => {
    setCurrentLevel(0);
    startTimer.current = new Date();
  };

  useEffect(() => {
    startTimer.current = new Date();

    return () => {
      startTimer.current = null;
    };
  }, []);

  useEffect(() => {
    setTasks(
      findTasks({
        taskKind,
        countOfItems: 3,
        difficulty: difficulty,
      })
    );
    setCurrentLevel((state) => state + 1);
  }, [difficulty, taskKind]);

  useEffect(() => {
    console.log("currentLevel ", currentLevel);
  }, [currentLevel]);

  return {
    tasks,
    taskKind,
    resetLevel,
    setTaskKind,
    setDifficulty,
    timePassed:
      currentLevel >= TASK_COUNT_PER_LEVEL &&
      getMinHoursPassed(startTimer.current),
    // isLevelCompleted: currentLevel === TASK_COUNT_PER_LEVEL,
  };
};

export default useTasks;
