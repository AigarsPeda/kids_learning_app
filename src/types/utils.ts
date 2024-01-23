type Table = "foo" | "bar" | "baz";
type TableHead = "address2" | "name" | "phone";

type UIParamsType = {
  table: Table;
  tableHead: TableHead;
};

type ButtonType = {
  icon: string;
  onClick: () => void;
  searchParams: SearchParams;
};

type SearchParams = {
  [K in keyof UIParamsType]: {
    key: K;
    value: UIParamsType[K];
  };
}[keyof UIParamsType];

const buttonsArray2: ButtonType[] = [
  {
    icon: "home",
    onClick: () => {},
    searchParams: {
      key: "tableHead",
      value: "name",
    },
  },
  {
    icon: "settings",
    onClick: () => {},
    searchParams: {
      key: "table",
      value: "baz",
    },
  },
];
