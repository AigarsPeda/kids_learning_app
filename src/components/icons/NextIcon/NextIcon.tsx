import Svg, { SvgProps, Path } from "react-native-svg";

const NextIcon = (props: SvgProps) => (
  <Svg width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      // stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 6 6 6-6 6"
    />
  </Svg>
);
export default NextIcon;
