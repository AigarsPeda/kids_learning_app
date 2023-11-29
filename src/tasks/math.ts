import {
  MathObjType,
  MathTaskExplanationType,
  MathTasksType,
} from "types/addition";

const EASY_TASKS: MathTasksType = {
  missingNumber: {
    tasks: [
      {
        id: "1",
        data: {
          a: 1,
          b: undefined,
          result: 3,
        },
      },
      {
        id: "2",
        data: {
          a: undefined,
          b: 2,
          result: 3,
        },
      },
      {
        id: "3",
        data: {
          a: 1,
          b: 2,
          result: undefined,
        },
      },
      {
        id: "4",
        data: {
          a: 4,
          b: 2,
          result: undefined,
        },
      },
      {
        id: "5",
        data: {
          a: undefined,
          b: 4,
          result: 8,
        },
      },
      {
        id: "6",
        data: {
          a: 7,
          b: undefined,
          result: 8,
        },
      },
    ],
  },
};

export const MATH_TASKS: MathObjType = {
  easy: EASY_TASKS,
};

export const MATH_TASK_EXPLANATION: MathTaskExplanationType = {
  missingNumber: "Atrodi nezināmo skaitli",
};
