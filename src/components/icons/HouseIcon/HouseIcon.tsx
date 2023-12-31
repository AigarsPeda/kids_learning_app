import Svg, { Path, SvgProps } from "react-native-svg";

const HouseIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 27 27" {...props}>
    <Path
      strokeWidth={2.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 9.777V16.2c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C7.28 21 8.12 21 9.8 21h4.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V5m2 7-5.433-6.036c-1.236-1.373-1.854-2.06-2.581-2.313a3 3 0 0 0-1.974 0c-.728.254-1.345.94-2.58 2.314L3 12"
    />
  </Svg>
);
export default HouseIcon;
