import { EquationArgumentType } from "types/addition";

export type AnswerType = "correct" | "incorrect" | "unknown";

// export type missingNumberAdditionInputType = Omit<EquationArgumentType, "kind">;

export type InputType = EquationArgumentType & {
  correct: AnswerType;
  isAnswered: boolean;
};
