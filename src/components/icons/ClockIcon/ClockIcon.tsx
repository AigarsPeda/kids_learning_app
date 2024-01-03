import Svg, { SvgProps, Path } from "react-native-svg";

const ClockIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 21 21" {...props}>
    <Path
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12a8 8 0 1 0 1.755-5M12 8v4l2.5 2.5M5.754 4.004v3h3"
    />
  </Svg>
);
export default ClockIcon;
