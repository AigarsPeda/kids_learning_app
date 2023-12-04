export type MathTasksType = {
  missingNumberAddition: {
    tasks: EquationArgumentType[];
  };
  missingNumberSubtraction: {
    tasks: EquationArgumentType[];
  };
  getResultOfAddition: {
    tasks: EquationArgumentType[];
  };
  getResultOfSubtraction: {
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
