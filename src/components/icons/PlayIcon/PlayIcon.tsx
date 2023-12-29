import Svg, { SvgProps, Path } from "react-native-svg";

const PlayIcon = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 26 26" {...props}>
    <Path
      strokeWidth={2}
      strokeLinejoin="round"
      d="M16.658 9.286c1.44.9 2.16 1.35 2.407 1.926a2 2 0 0 1 0 1.576c-.247.576-.967 1.026-2.407 1.926L9.896 18.94c-1.598.999-2.397 1.498-3.056 1.445a2 2 0 0 1-1.446-.801C5 19.053 5 18.111 5 16.226V7.774c0-1.885 0-2.827.394-3.358a2 2 0 0 1 1.446-.801c.66-.053 1.458.446 3.056 1.445l6.762 4.226Z"
    />
  </Svg>
);
export default PlayIcon;
