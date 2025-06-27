import { create } from "zustand";

export type ThemeName = "light" | "dark";

interface ThemeState {
  theme: ThemeName;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
