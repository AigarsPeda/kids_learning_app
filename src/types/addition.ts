export type MathTasksType = {
  missingNumber: {
    tasks: EquationArgumentType[];
  };
  getResult: {
    tasks: EquationArgumentType[];
  };
};

export type TaskKindType = keyof MathTasksType;

export type MathTaskExplanationType = {
  [key in TaskKindType]: string;
};

export type EquationArgumentType = {
  id: string;
  kind: TaskKindType;
  a: number | undefined;
  b: number | undefined;
  result: number | undefined;
};

export type MathObjType = {
  easy: MathTasksType;
};

export type MathObjKeysType = keyof MathObjType;
