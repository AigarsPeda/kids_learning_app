import { useEffect, useState } from "react";
import {
  MathObjKeysType,
  MissingNumberTaskType,
  TaskKindType,
} from "types/addition";
import findTasks from "utils/findTasks";

const useTasks = () => {
  const [level, setLevel] = useState<MathObjKeysType>("easy");
  const [taskKind, setTaskKind] = useState<TaskKindType>("missingNumber");
  const [tasks, setTasks] = useState<{
    description: string;
    tasks: MissingNumberTaskType[];
  }>({
    tasks: [],
    description: "No description",
  });

  useEffect(() => {
    setTasks(findTasks(level, taskKind));
  }, [level, taskKind]);

  return {
    tasks,
    taskKind,
    setLevel,
    setTaskKind,
  };
};

export default useTasks;
