import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeName } from "@/types/theme";

interface ThemeStore {
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (t: ThemeName) => void;
}

export const useThemeStore = create(
  persist<ThemeStore>(
    (set) => ({
      themeName: "light",
      toggleTheme: () =>
        set((state) => ({
          themeName: state.themeName === "light" ? "dark" : "light",
        })),
      setTheme: (t) => set({ themeName: t }),
    }),
    {
      name: "theme-storage", // localStorage key 이름
    }
  )
);