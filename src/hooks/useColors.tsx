import { useColorScheme } from "react-native";
import { darkModeColors, lightModeColors } from "styles/colors";

const useColors = () => {
  const colorTheme = useColorScheme();

  return {
    isDark: colorTheme === "dark",
    colors: colorTheme === "dark" ? darkModeColors : lightModeColors,
  };
};

export default useColors;
