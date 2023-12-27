import Svg, { Circle, Ellipse, G, Path, SvgProps } from "react-native-svg";

const RedMonster = (props: SvgProps) => (
  <Svg
    fillRule="evenodd"
    clipRule="evenodd"
    strokeMiterlimit={2}
    viewBox="0 0 604 619"
    strokeLinejoin="round"
    {...props}
  >
    <G transform="translate(-3802.63 -1600)">
      {/* <Ellipse
        cx={4104.62}
        cy={2206.64}
        rx={183.105}
        ry={11.923}
        fill="#e7e9ea"
      /> */}
      <Path
        d="M3999.81 1677.14c-.1-.07-.2-.13-.3-.2-4.15 2.68-9.05 3.84-13.16 6.62-5.48 3.73-9.92 8.98-14.46 13.74-2.57 2.7-6.48-.64-5.3-3.55-14.04-27.83-11.42-62.38-2.75-91.43.99-3.33 5.13-2.85 6.29 0 9.71 23.82 8.54 54.3 32.98 69.18 3.57 2.18.3 7.82-3.3 5.64ZM4218.42 1680.25c.12-.04.22-.09.34-.14 3.59 3.38 8.21 5.41 11.75 8.88 4.71 4.65 8.14 10.63 11.75 16.13 2.04 3.12 6.49.54 5.84-2.54 18.84-24.84 22.48-59.3 19.19-89.44-.37-3.45-4.53-3.72-6.18-1.14-13.85 21.69-18.19 51.88-44.92 62.12-3.9 1.49-1.7 7.63 2.23 6.13ZM4371.72 2034.69c-7.17 3.97-14.64 7.2-22.27 10.16-6.53 2.54-13.53 4.61-19.48 8.4-.93.59-.59 2.15.58 2.14 9.17-.09 18.9-2.41 28.2-5.51-17.06 16.85-35.74 30.79-59.51 37.89-27.2 8.13-57.51 6.57-84.61-1.3-1.52-.44-2.55 1.85-1.1 2.59 27.88 14.29 58.28 17.59 88.63 9.31 23.4-6.38 46.2-19.47 62.99-37.51-2.24 11.19-4.91 22.21-9.2 33.18-2.55 6.51 7.13 9.56 10.64 4.49 11.62-16.77 11.54-40.04 12.4-59.67.16-3.77-4.2-5.87-7.27-4.17Z"
        fill="#073f5b"
        fillRule="nonzero"
      />
      <Path
        d="M4262.15 1905.11c13.13-7.76 23.89-18.54 33.85-29.98 8.15-9.37 16.84-18.82 20.98-30.75 3.52-10.18 3.29-21.06 1.24-31.51-1.09-5.55-3-10.91-4.78-16.28-.95-2.54-1.76-5.1-2.3-7.7-.47-1.82-.9-3.64-1.2-5.5-1.33-8.18 1.2-16.66 10.1-18.81 8.47-2.05 19.92 2.6 24.85 9.7 1.81 2.62 2.66 5.73 3.7 8.71.31.57.59 1.18.82 1.92.07.21.13.43.19.64.39.9.82 1.77 1.35 2.58 2.34 3.6 6.61 2.5 10.36 1.19 1.04-.54 2.09-1.04 3.19-1.32.37-.1.74-.18 1.12-.26 6.95-2.72 13.75-6.56 21.17-7.65 9.03-1.33 15.76 4.15 15.67 13.56-.07 8.16-6.35 13.5-12.63 17.96 8.95 4.95 18.97 13.6 16.37 23.94-1.23 4.94-4.86 8.13-9.13 10.28-.36.29-.72.58-1.09.83-3.19 2.13-7.33 2.84-11.37 3.49-3.05 1.08-5.92 2.4-8.82 4.55-4.68 3.46-8.6 7.82-12.55 12.06a609.69 609.69 0 0 1-5.63 5.96c-.93 1.04-1.9 2.04-2.9 3-11.53 11.76-24.24 22.86-39.43 29.14-7.46 3.08-15.7 5.01-23.58 6.66-7.33 1.53-15.24 2.74-22.7 1.31-.63.02-1.26.06-1.89.06-1.51.02-2.57-.9-3.02-2.07-2.81-.2-4.89-3.97-1.94-5.71ZM3947.1 1905.11c-13.13-7.76-23.89-18.54-33.85-29.98-8.15-9.37-16.84-18.82-20.98-30.75-3.52-10.18-3.29-21.06-1.24-31.51 1.09-5.55 3-10.91 4.78-16.28.95-2.54 1.76-5.1 2.3-7.7.47-1.82.9-3.64 1.2-5.5 1.33-8.18-1.2-16.66-10.1-18.81-8.47-2.05-19.92 2.6-24.85 9.7-1.81 2.62-2.66 5.73-3.7 8.71-.31.57-.59 1.18-.82 1.92-.07.21-.13.43-.19.64-.39.9-.82 1.77-1.35 2.58-2.34 3.6-6.61 2.5-10.36 1.19-1.04-.54-2.09-1.04-3.19-1.32-.37-.1-.74-.18-1.11-.26-6.96-2.72-13.76-6.56-21.18-7.65-9.03-1.33-15.76 4.15-15.67 13.56.08 8.16 6.35 13.5 12.63 17.96-8.95 4.95-18.96 13.6-16.37 23.94 1.23 4.94 4.87 8.13 9.13 10.28.36.29.72.58 1.09.83 3.19 2.13 7.34 2.84 11.38 3.49 3.04 1.08 5.91 2.4 8.81 4.55 4.68 3.46 8.6 7.82 12.56 12.06 1.84 1.98 3.72 3.97 5.62 5.96.94 1.04 1.9 2.04 2.91 3 11.53 11.76 24.23 22.86 39.43 29.14 7.45 3.08 15.69 5.01 23.58 6.66 7.33 1.53 15.23 2.74 22.69 1.31.63.02 1.27.06 1.89.06 1.51.02 2.58-.9 3.02-2.07 2.81-.2 4.89-3.97 1.94-5.71Z"
        fill="#fa3a49"
        fillRule="nonzero"
      />
      <Path
        d="M4295.09 1986.02c-2.66 23.78-6.47 46.24-17.77 67.61-10.52 19.88-25.46 37.43-43.16 51.27-.5.39-.99.77-1.49 1.14-40.43 30.83-93.55 38.5-142.86 30.18-25.72-4.35-51.95-11.17-76.67-19.46-23.13-7.75-44.66-19.04-62.46-35.91-5.83-5.5-11.23-11.46-16.12-17.81-9.38-12.18-16.88-25.8-21.9-40.4-8.4-24.4-9.77-51.84-10.45-77.44-.73-27.1 1.03-54.29 5.7-81 4.81-27.54 14.48-53.14 22.59-79.74 8.09-26.54 13.99-55.14 26.8-79.92 5.66-10.93 13.42-21.21 23.06-28.93 5.88-4.7 12.31-8.57 18.65-12.6 3.8-3.16 7.8-5.91 11.97-8.32.03 0 .04-.01.06-.03.28-.23.6-.39.91-.51 15.02-8.42 32.17-12.66 49.38-15.84 7.48-1.38 14.59-3.2 21.75-5.79 5.37-1.96 10.7-3.84 16.41-4.55 11.88-1.52 24.07-.23 35.84 1.68 46.49 7.54 92.84 26.12 119.57 66.67 23.15 35.11 32.58 78 38.47 119.05 8.13 56.53 8.06 113.93 1.72 170.65Z"
        fill="#fa3a49"
        fillRule="nonzero"
      />
      <Path
        d="M4024.33 2086.32c-22.16 20.83-42.79 44.57-69.32 60.05-9.92 5.78-21.45 10.65-33.17 9.14-10.14-1.3-18.37-7.41-23.91-15.81-12.74-19.32-12.22-46.54-3.57-67.29 2.94-7.09 8.43-15.77 17.33-12.13 7.73 3.17 12.83 12.37 17.34 18.93 6.4 9.3 14.4 22.75 26.92 23.96 5.01.48 9.94-1.47 14.56-3.34.35-.73 1-1.31 2.03-1.57 2.23-.57 4.48-1.13 6.72-1.71 3.3-1.12 6.63-2.06 10.04-2.77 10.78-3.15 21.35-6.99 31.08-12.57 3.18-1.83 6.68 2.56 3.95 5.11ZM4176.74 2074.23c22.4 20.57 47.59 39.4 64.98 64.72 6.49 9.47 12.2 20.61 11.55 32.42-.55 10.2-6.04 18.85-14 25-18.34 14.13-45.53 15.61-66.86 8.51-7.28-2.42-16.34-7.26-13.37-16.4 2.59-7.94 11.4-13.7 17.61-18.69 8.81-7.05 21.63-16.03 21.92-28.6.11-5.03-2.2-9.81-4.4-14.28-.76-.29-1.39-.9-1.73-1.91-.72-2.18-1.44-4.38-2.19-6.57-1.36-3.21-2.54-6.46-3.5-9.81-3.94-10.51-8.54-20.78-14.82-30.07-2.05-3.04 2.06-6.85 4.81-4.32Z"
        fill="#fa3a49"
        fillRule="nonzero"
      />
      <Path
        d="M4100.51 1884.16c53.85 0 100.1-25.33 120.13-12.77-8.28-7.77-20.74-11.79-52.69-3.5-73.08 18.98-103.43 10.28-152.76 2.44 22.9 4.54 52.72 13.83 85.32 13.83ZM4231.23 1898.32c.01.54.02 1.07.02 1.63 0 61.35-58.09 90.13-130.29 90.13-67.49 0-123.47-24.76-130.45-78.48 1.68 59.61 59.56 90.44 130.71 90.44 72.2 0 130.74-31.75 130.74-93.11 0-3.97-.25-7.49-.73-10.61Z"
        fill="#f1f2f2"
        fillOpacity={0.29}
        fillRule="nonzero"
      />
      <Path
        d="M4231.25 1899.95c0 61.35-58.53 93.11-130.74 93.11-72.21 0-130.74-31.76-130.74-93.11 0-61.35 58.53-15.79 130.74-15.79 72.21 0 130.74-45.56 130.74 15.79Z"
        fill="#171f21"
        fillRule="nonzero"
      />
      <Path
        d="M4230.69 1910.04c-16.58-8.25-36.63-13.09-58.25-13.09-57 0-103.21 33.6-103.21 75.04 0 6.71 1.22 13.22 3.49 19.4 8.96 1.11 18.25 1.67 27.79 1.67 68.14 0 124.09-28.28 130.18-83.02Z"
        fill="#101516"
        fillRule="nonzero"
      />
      <Path
        d="M4045.18 1876.19c0 11.93 3.03 33.99 16.57 33.99 8.21 0 16.56-14.4 16.56-28.2-11.64-1.33-22.75-3.5-33.13-5.79Z"
        fill="#fff"
        fillRule="nonzero"
      />
      <Path
        d="M4075.57 1881.64c-1.03 12.91-10.33 23.27-22.15 24.88 2.19 2.27 4.93 3.67 8.33 3.67 8.21 0 16.56-14.41 16.56-28.21-.92-.1-1.83-.22-2.74-.34Z"
        fill="#231f20"
        fillOpacity={0.1}
        fillRule="nonzero"
      />
      <Path
        d="M4128.35 1881.27c0 9.87 1.41 28.92 16.56 28.92 13.4 0 16.57-20.66 16.57-35.26-10.31 2.35-21.42 4.72-33.13 6.34Z"
        fill="#fff"
        fillRule="nonzero"
      />
      <Path
        d="M4158.1 1875.69c.02.44.03.89.03 1.33 0 15.62-9.33 28.52-21.46 30.61 2.15 1.6 4.85 2.55 8.24 2.55 13.4 0 16.57-20.66 16.57-35.25-1.12.25-2.24.5-3.38.76Z"
        fill="#231f20"
        fillOpacity={0.1}
        fillRule="nonzero"
      />
      <Path
        d="M4211.62 1954.28c-13.32-14.44-34.92-23.84-59.3-23.84-40.49 0-73.31 25.87-73.31 57.79 0 1.59.11 3.16.27 4.71 6.91.64 14 .96 21.23.96 46.91 0 88.04-13.41 111.11-39.62Z"
        fill="#ed5d80"
        fillRule="nonzero"
      />
      <Path
        d="M4211.62 1954.28c-7.42-8.05-17.42-14.53-29.02-18.69 0 .28.02.56.02.84 0 22.09-14.73 41.54-37.07 52.91 27.57-5.95 50.79-17.69 66.07-35.06Z"
        fill="#231f20"
        fillOpacity={0.1}
        fillRule="nonzero"
      />
      <Path
        d="M4049.15 1961.65c-9.41-3.65-19.46 11.27-23.51 18.2 9.45 4.15 19.82 7.4 30.88 9.72.95-8.49 1.47-24.49-7.37-27.92Z"
        fill="#fff"
        fillRule="nonzero"
      />
      <Path
        d="M4050.04 1962.06c2.31 4.39 4.96 13.04.8 26.21 1.88.45 3.77.89 5.68 1.29.91-8.19 1.43-23.37-6.48-27.5Z"
        fill="#231f20"
        fillOpacity={0.1}
        fillRule="nonzero"
      />
      <Circle
        cx={4107.48}
        cy={1785.44}
        r={74.882}
        fill="#231f20"
        fillOpacity={0.16}
        transform="rotate(-76.714 4107.827 1785.457)"
      />
      <Circle
        cx={4107.48}
        cy={1777.43}
        r={68.07}
        fill="#fff"
        transform="rotate(-45.001 4107.473 1777.487)"
      />
      <Circle
        cx={4095.45}
        cy={1757.6}
        r={44.045}
        fill="#8f489b"
        transform="rotate(-76.714 4095.802 1757.61)"
      />
      <Circle
        cx={4095.45}
        cy={1757.6}
        r={22.691}
        fill="#212121"
        fillOpacity={0.52}
        transform="rotate(-22.5 4095.263 1757.536)"
      />
      <Ellipse
        cx={4090.23}
        cy={1733.63}
        rx={20.964}
        ry={11.647}
        fill="#fff"
        transform="rotate(-14.342 4089.575 1733.464)"
      />
      <Path
        d="M4121.76 1776.64c1.66 4.06-2.91 9.78-10.22 12.78-7.3 3-14.58 2.14-16.24-1.92-1.67-4.06 2.9-9.78 10.21-12.78 7.3-3 14.58-2.14 16.25 1.92Z"
        fill="#fff"
        fillRule="nonzero"
      />
      <Path
        d="M4043.41 1653.9c-9.8-5.63-27.07 2.95-34.75 9.01-4.25 3.36-8.03 8.35-6.56 14.1 1.2 4.67 5.23 6.43 9.7 6 .26-.03.52-.07.78-.1 7.07.32 16.76-4.09 20.83-6.09 6.82-3.36 21.99-16.02 10-22.92ZM4001.44 1694.63c-2.26-8.45-12.36-8.06-18.86-5.48-7.15 2.83-15.14 9.02-16.13 17.15-1.05 2.27-1.54 4.75-1.06 7.27.97 5.16 4.98 8.79 10.32 8.72 5.11-.06 9.76-3.26 13.58-6.32 5.82-4.65 14.38-13.03 12.15-21.34ZM4038.64 1697.86c-1-3.75-3.77-5.94-7.07-6.93-.85-.33-1.75-.52-2.65-.55-2.15-.25-4.38-.08-6.39.42-7.6 1.91-13.71 8.32-15.39 15.94-.67 3.04.43 6.83 3.08 8.67 4.95 5.77 13.99 2.99 19.58-.66 5.49-3.57 10.71-9.9 8.84-16.89ZM4197.54 1661.02c-1.39.83-2.48 1.82-3.33 2.93-1.97.93-3.15 2.91-3.75 5.14-1.7 6.33 2.82 12.5 7.39 16.4 4.25 3.62 9.83 7.77 15.69 7.68 5.81-.09 9.72-4.84 9.75-10.47.07-11.12-13.38-29.08-25.75-21.68ZM4258.46 1706.28c-1.48-2.85-3.66-5.56-6.24-7.75-2.66-3.14-6.12-5.9-10.38-5.82-5.75.11-9.74 5.12-9.46 10.66.43 8.66 9.96 20.72 19.46 19.19 8.08-1.29 9.98-9.82 6.62-16.28ZM4232.61 1711.5c-4.82-7.56-15.25-16.39-23.67-7.76-6.07 6.22-2.37 15.24 3.96 20.22.61 1.24 1.3 2.43 2.08 3.52 2.46 3.5 6.23 4.06 9.24 2.85 4.67 1.25 9.97-1.27 11.35-6.1 1.25-4.39-.62-9.05-2.96-12.73ZM3954.7 2016.52c-2.25-4.36-6.07-8.23-10.98-9.28-5.7-1.22-11.25 1.09-13.94 6.35-4.21 8.22 1.43 24.5 11.92 23.83.98.43 2.02.75 3.11.9 5.01.71 9.79-2.12 11.61-6.81 1.9-4.9.61-10.48-1.72-14.99ZM3954.93 2047.59c-3.06 1.05-5.62 3.21-7.09 5.96-.97.97-1.6 2.34-1.71 4.14-.11 1.9.38 3.74 1.17 5.47.8 2.19 2.14 4.24 3.84 5.91 2.83 3.45 6.52 6.36 11.23 6.38 5.31.02 9.72-3.97 10.93-9.02 2.58-10.65-7.06-22.74-18.37-18.84ZM3994.42 2024.86c-1.61-1.76-3.64-3.19-5.85-3.77-.3-.07-.6-.13-.89-.18-1.16-.33-2.35-.53-3.55-.56-6.71-.15-11.2 5.25-11.7 11.6-.44 5.71 3.08 10.67 8.39 12.54 2.12.74 4.57.86 6.91.46 2.71.29 5.49-.54 7.72-2.76 5.58-5.52 3.74-12.73-1.03-17.33ZM4224.16 2036.73c-9.26-.28-24.42 6.95-21.5 18.44-.67 3.12-.09 6.41 2.39 9.12 7.53 8.26 21.69 1.04 27.67-5.64 7.94-8.86 4.02-21.54-8.56-21.92ZM4200.82 2070.62c-7.46-1.95-16.8 5.51-19.51 12.86-.19.35-.4.68-.57 1.04-2.82 6.09-1.83 13.99 5.57 16.05 7.82 2.17 14.49-3.37 18.59-9.37 4.57-6.71 5.87-17.99-4.08-20.58ZM4244.74 2074.01c-2.29-7.32-10.4-7.17-15.77-3.62-3.35 1.49-6.36 4.07-8.68 6.72-3.3 3.76-6.51 8.87-5.28 14.11 1.42 6.03 7.79 8.78 13.44 7.2 9.27-2.61 19.43-14.41 16.29-24.41Z"
        fill="#f4223c"
        fillRule="nonzero"
      />
      <Path
        d="M4232.67 2106.04c-40.43 30.83-93.55 38.5-142.86 30.18-25.72-4.35-51.95-11.17-76.67-19.46-23.13-7.75-44.66-19.04-62.46-35.91-5.83-5.5-11.23-11.46-16.12-17.81 5.04 1.91 9.57 5.07 14 8.37 16.31 8.03 31.08 19.05 47.99 25.86 9.14 3.69 18.87 5.74 28.31 8.49 9.64 2.79 19.25 5.74 28.95 8.29 19.81 5.21 39.42 6.93 59.81 7.6 38.77 1.28 78.99-.22 114.8-16.67 1.85-.85 3.46-.17 4.25 1.06Z"
        fill="#fa3a49"
        fillOpacity={0.6}
        fillRule="nonzero"
      />
    </G>
  </Svg>
);
export default RedMonster;
