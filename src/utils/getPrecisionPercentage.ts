interface ArgsType {
  value: number;
  precision: number;
}

const getPrecisionPercentage = ({ value, precision }: ArgsType): number => {
  return Math.round((value / precision) * 100);
};

export default getPrecisionPercentage;
