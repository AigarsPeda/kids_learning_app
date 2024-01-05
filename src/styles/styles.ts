type Colors = {
  text: string;
  gray: string;
  yellow: string;
  accent: string;
  correct: string;
  incorrect: string;
  lightGray: string;
  completed: string;
  background: string;
  accentBackground: string;
  transparent: string;
};

export type KeyTypeOfColors = keyof Colors;

// Hey, I'm a comment!
export const lightModeColors: Colors = {
  text: "#222",
  gray: "#d1d5db",
  accent: "#a855f7",
  background: "#fff",
  correct: "#4caf50",
  incorrect: "#ff0033",
  lightGray: "#e5e7eb",
  completed: "#9ca3af",
  yellow: "#fef400",
  accentBackground: "#f3f4f6",
  transparent: "transparent",
};

export const darkModeColors: Colors = {
  text: "#fff",
  gray: "#64748b",
  accent: "#a855f7",
  background: "#111827",
  correct: "#4caf50",
  incorrect: "#ff0033",
  lightGray: "#1f2937",
  completed: "#9ca3af",
  yellow: "#fef400",
  accentBackground: "#020617",
  transparent: "transparent",
};

export const typography = {
  primaryRegularFont: "BloggerSans",
  primaryBoldFont: "BloggerSansBold",
  primaryMediumFont: "BloggerSansMedium",
};
