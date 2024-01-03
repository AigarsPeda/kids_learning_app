import Svg, { Path, SvgProps } from "react-native-svg";

const TargetIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 1 1-9-9m5 9a5 5 0 1 1-5-5m2.758 2.352 3.959.415 2.146-3.004-2.575-.859-.859-2.575-3.004 2.146.333 3.877Zm0 0L12 12"
    />
  </Svg>
);
export default TargetIcon;
