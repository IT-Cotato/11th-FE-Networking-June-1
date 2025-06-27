import { useThemeStore } from "../stores/useThemeStore";
import { themes } from "../styles";
import type { Theme } from "../styles";

/**
 *
 * 지정된 테마를 반환하는 커스텀 훅
 */
export const useTheme = (): Theme => {
  const themeName = useThemeStore((state) => state.themeName);
  return themes[themeName];
};
