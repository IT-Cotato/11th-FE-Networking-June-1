import { create } from "zustand";
import type { ThemeName } from "../styles";

interface ThemeStore {
  themeName: ThemeName;
  setThemeName: (theme: ThemeName | ((prev: ThemeName) => ThemeName)) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeName: "light",
  setThemeName: (theme) =>
    set((state) => ({
      themeName: typeof theme === "function" ? theme(state.themeName) : theme,
    })),
}));
