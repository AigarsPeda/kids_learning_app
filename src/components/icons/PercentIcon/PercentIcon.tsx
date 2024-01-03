import Svg, { Path, SvgProps } from "react-native-svg";

const PercentIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 19 19 5M9 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm10 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </Svg>
);
export default PercentIcon;
