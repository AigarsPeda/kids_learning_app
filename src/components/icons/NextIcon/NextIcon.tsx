import Svg, { SvgProps, Path } from "react-native-svg";

const NextIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 6 6 6-6 6"
    />
  </Svg>
);
export default NextIcon;
