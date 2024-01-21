type Table = "foo" | "bar" | "baz";
type TableHead = "address2" | "name" | "phone";

type UIParamsType = {
  table: Table;
  tableHead: TableHead;
};

type ParamsKeyType = keyof UIParamsType;
type ValueForParamsKey<T extends ParamsKeyType> = UIParamsType[T];

type ButtonType<T extends ParamsKeyType> = {
  icon: string;
  searchParams: {
    key: T;
    value: ValueForParamsKey<T>;
  };
};

// Utility function to create a ButtonType instance
function createButton<T extends ParamsKeyType>(
  button: ButtonType<T>
): ButtonType<T> {
  return button;
}

const validateSearchParams = <T extends ParamsKeyType>(
  key: T,
  value: ValueForParamsKey<T>
): { key: T; value: ValueForParamsKey<T> } => {
  return { key, value };
};

export const buttonsArray: ButtonType<ParamsKeyType>[] = [
  {
    icon: "home",
    searchParams: validateSearchParams("tableHead", "name"),
  },
  {
    icon: "settings",
    searchParams: validateSearchParams("table", "foo"),
  },
];

// Create an array of buttons
// export const buttonsArray = [
//   createButton({
//     icon: "home",
//     onClick: () => {},
//     searchParams: {
//       key: "tableHead",
//       value: "address2",
//     },
//   }),
//   createButton({
//     icon: "settings",
//     onClick: () => {},
//     searchParams: {
//       key: "table",
//       value: "foo",
//     },
//   }),
// ];
