export type NonNullable<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined | null>;
};
