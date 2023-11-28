import { Appearance } from "react-native";

type Colors = {
  text: string;
  accent: string;
  background: string;
};

// colorTheme === "dark" ? "#c4b5fd" : "#fff",

export const lightModeColors: Colors = {
  text: "#222",
  accent: "#f97316",
  background: "#fff",
};

export const darkModeColors: Colors = {
  text: "#fff",
  accent: "#f97316",
  background: "#222",
};

const isDark = Appearance.getColorScheme() === "dark";

// will always be the color theme from when file was first initialized
export const colors = isDark ? darkModeColors : lightModeColors;
