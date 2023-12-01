import {
  MathObjType,
  MathTaskExplanationType,
  MathTasksType,
} from "types/addition";

const EASY_TASKS: MathTasksType = {
  missingNumber: {
    tasks: [
      {
        // data: {
        id: "1",
        a: 1,
        b: undefined,
        result: 3,
        kind: "missingNumber",
        // },
      },
      {
        // data: {
        id: "2",
        a: undefined,
        b: 2,
        result: 3,
        kind: "missingNumber",
        // },
      },
      {
        // data: {
        id: "3",
        a: 1,
        b: 2,
        result: undefined,
        kind: "missingNumber",
        // },
      },
      {
        // data: {
        id: "4",
        a: 4,
        b: 2,
        result: undefined,
        kind: "missingNumber",
        // },
      },
      {
        // data: {
        id: "5",
        a: undefined,
        b: 4,
        result: 8,
        kind: "missingNumber",
        // },
      },
      {
        // data: {
        id: "6",
        a: 7,
        b: undefined,
        result: 8,
        kind: "missingNumber",
        // },
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
