import { useThemeStore } from "../stores/useThemeStore";

export const useTheme = () => {
  const themeName = useThemeStore((state) => state.themeName);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { themeName, theme, toggleTheme };
};
