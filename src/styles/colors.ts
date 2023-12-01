type Colors = {
  text: string;
  gray: string;
  accent: string;

  correct: string;
  incorrect: string;
  background: string;
  accentBackground: string;
};

export const lightModeColors: Colors = {
  text: "#222",
  gray: "#64748b",
  accentBackground: "#f3f4f6",
  accent: "#a855f7",
  background: "#fff",
  correct: "#4caf50",
  incorrect: "#f44336",
};

export const darkModeColors: Colors = {
  text: "#fff",
  gray: "#64748b",
  accent: "#a855f7",
  background: "#111827",
  accentBackground: "#020617",
  correct: "#4caf50",
  incorrect: "#f44336",
};
