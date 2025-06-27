import { useState } from "react";
import type { ThemeName } from "../types";

export function useThemeMode(initialTheme: ThemeName = "light") {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { themeName, toggleTheme };
}
