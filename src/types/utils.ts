export type NonNullable<T> = {
  [P in keyof T]-?: Exclude<T[P], undefined | null>;
};

// this ?
const PARAMS = {
  UI: {
    tableHead: "address",
    table: "taxi",
  },
  API: {
    color: "blue",
    size: 10,
  },
};

// type of params key is "UI" | "API"
type ParamsKey = keyof typeof PARAMS;

// type of params value is { color: string, size: number }
type ParamsValue = (typeof PARAMS)[ParamsKey];
