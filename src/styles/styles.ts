type Colors = {
  text: string;
  gray: string;
  white: string;
  yellow: string;
  accent: string;
  correct: string;
  incorrect: string;
  lightGray: string;
  completed: string;
  background: string;
  transparent: string;
  accentBackground: string;
};

export type KeyTypeOfColors = keyof Colors;

export const lightModeColors: Colors = {
  text: "#222",
  white: "#fff",
  gray: "#d1d5db",
  accent: "#a855f7",
  yellow: "#fef400",
  background: "#fff",
  correct: "#4caf50",
  incorrect: "#ff0033",
  lightGray: "#e5e7eb",
  completed: "#9ca3af",
  accentBackground: "#f3f4f6",
  transparent: "transparent",
};

export const darkModeColors: Colors = {
  text: "#fff",
  white: "#fff",
  gray: "#64748b",
  yellow: "#fef400",
  accent: "#a855f7",
  correct: "#4caf50",
  incorrect: "#ff0033",
  lightGray: "#1f2937",
  completed: "#9ca3af",
  background: "#111827",
  transparent: "transparent",
  accentBackground: "#020617",
};

export const typography = {
  primaryRegularFont: "BloggerSans",
  primaryBoldFont: "BloggerSansBold",
  primaryMediumFont: "BloggerSansMedium",
};
