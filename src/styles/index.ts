import type { ThemeName, Theme } from "./theme";

import { lightTheme } from "./light";
import { darkTheme } from "./dark";

export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export type { Theme, ThemeName };
