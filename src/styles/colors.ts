import { Appearance } from "react-native";

type Colors = {
  text: string;
  textAccent: string;
  background: string;
};

export const lightModeColors: Colors = {
  text: "#222",
  textAccent: "#444",
  background: "#fff",
};

export const darkModeColors: Colors = {
  text: "#fff",
  textAccent: "#ccc",
  background: "#222",
};

const isDark = Appearance.getColorScheme() === "dark";

// will always be the color theme from when file was first initialized
export const colors = isDark ? darkModeColors : lightModeColors;
