import { useColorScheme } from "react-native";
import { darkModeColors, lightModeColors, typography } from "styles/styles";

const useStyles = () => {
  const colorTheme = useColorScheme();

  return {
    typography: typography,
    isDark: colorTheme === "dark",
    colors: colorTheme === "dark" ? darkModeColors : lightModeColors,
  };
};

export default useStyles;
