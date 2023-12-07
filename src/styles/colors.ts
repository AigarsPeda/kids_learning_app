type Colors = {
  text: string;
  gray: string;
  accent: string;
  correct: string;
  incorrect: string;
  background: string;
  accentBackground: string;
};

// Hey, I'm a comment!
export const lightModeColors: Colors = {
  text: "#222",
  gray: "#64748b",
  accent: "#a855f7",
  background: "#fff",
  correct: "#4caf50",
  incorrect: "#ff0033",
  accentBackground: "#f3f4f6",
};

export const darkModeColors: Colors = {
  text: "#fff",
  gray: "#64748b",
  accent: "#a855f7",
  background: "#111827",
  correct: "#4caf50",
  incorrect: "#ff0033",
  accentBackground: "#020617",
};

export const typography = {
  primaryFontFamily: "Rubik",
  primaryBoldFontFamily: "RubikBold",
  primaryRegularFamily: "RubikRegular",
  primaryMediumFamily: "RubikMedium",
};
