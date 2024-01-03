import Svg, { SvgProps, Path } from "react-native-svg";

const NextIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 6 6 6-6 6"
    />
  </Svg>
);
export default NextIcon;
