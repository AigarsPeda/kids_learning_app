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
        a: 1,
        b: undefined,
        result: 3,
        kind: "missingNumber",
      },
      {
        id: "2",
        a: undefined,
        b: 2,
        result: 3,
        kind: "missingNumber",
      },
      {
        id: "3",
        a: 1,
        b: 2,
        result: undefined,
        kind: "missingNumber",
      },
      {
        id: "4",
        a: 4,
        b: 2,
        result: undefined,
        kind: "missingNumber",
      },
      {
        id: "5",
        a: undefined,
        b: 4,
        result: 8,
        kind: "missingNumber",
      },
      {
        id: "6",
        a: 7,
        b: undefined,
        result: 8,
        kind: "missingNumber",
      },
      {
        id: "7",
        a: 1,
        b: undefined,
        result: 10,
        kind: "missingNumber",
      },
      {
        id: "8",
        a: undefined,
        b: 9,
        result: 15,
        kind: "missingNumber",
      },
      {
        id: "9",
        a: 7,
        b: undefined,
        result: 15,
        kind: "missingNumber",
      },
      {
        id: "10",
        a: undefined,
        b: 8,
        result: 15,
        kind: "missingNumber",
      },
    ],
  },
  getResult: {
    tasks: [
      {
        id: "1",
        a: 1,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "2",
        a: 2,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "3",
        a: 3,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "4",
        a: 4,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "5",
        a: 5,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "6",
        a: 6,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "7",
        a: 7,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "8",
        a: 8,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "9",
        a: 9,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
      {
        id: "10",
        a: 10,
        b: 2,
        result: undefined,
        kind: "getResult",
      },
    ],
  },
};

export const MATH_TASKS: MathObjType = {
  easy: EASY_TASKS,
};

export const MATH_TASK_EXPLANATION: MathTaskExplanationType = {
  missingNumber: "Atrodi nezināmo skaitli",
  getResult: "Atrisini vienādojumu",
};
