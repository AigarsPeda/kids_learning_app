import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const ZigIcon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    // xmlSpace="preserve"
    style={
      {
        // enableBackground: "new 0 0 512 512",
      }
    }
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      id="Layer_2"
      d="M96.34 284.23h180.57c7.31 0 12.63 6.92 10.75 13.98L242.39 468.4c-.01.02.02.03.03.02l176.73-248.38c5.24-7.36-.02-17.57-9.06-17.57H263.13c-8.2 0-13.58-8.57-10.02-15.95l61.22-127.06c3.56-7.39-1.82-15.95-10.02-15.95H177.58c-4.65 0-8.81 2.89-10.43 7.25L85.92 269.23c-2.7 7.27 2.67 15 10.42 15z"
      // style={{
      //   fill: "#333",
      // }}
    />
  </Svg>
);
export default ZigIcon;
