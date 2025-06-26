import { useThemeStore } from "../stores/useThemeStore";

/**
 * 테마 관련 상태와 기능을 제공하는 커스텀 훅
 * - 현재 테마 이름("light" | "dark")
 * - 테마 색상 객체(theme)
 * - 테마 전환 함수(toggleTheme)
 */
export const useTheme = () => {
  const themeName = useThemeStore((state) => state.themeName);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return { themeName, theme, toggleTheme };
};
