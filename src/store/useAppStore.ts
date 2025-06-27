import { create } from 'zustand';
import type { ThemeName } from '../hooks/useTheme';

interface AppState {
  themeName: ThemeName;
  toggleTheme: () => void;
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number) => void;
}

export const useAppStore = create<AppState>(set => ({
  themeName: 'light',
  toggleTheme: () =>
    set(state => ({
      themeName: state.themeName === 'light' ? 'dark' : 'light',
    })),
  selectedProjectId: null,
  setSelectedProjectId: id => set({ selectedProjectId: id }),
}));
