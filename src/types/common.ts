import { EquationArgumentType } from "types/addition";

export type AnswerType = "correct" | "incorrect" | "unknown";

export type MissingNumberInputType = Omit<EquationArgumentType, "kind">;
