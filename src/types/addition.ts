export type MathTasksType = {
  missingNumber: {
    // description: string;
    tasks: MissingNumberTaskType[];
  };
};

export type TaskKindType = keyof MathTasksType;

export type MathTaskExplanationType = {
  [key in TaskKindType]: string;
};

export type EquationArgumentType = {
  a: number | undefined;
  b: number | undefined;
  result: number | undefined;
};

export type MissingNumberTaskType = {
  id: string;
  data: EquationArgumentType;
};

export type MathObjType = {
  easy: MathTasksType;
};

export type MathObjKeysType = keyof MathObjType;
