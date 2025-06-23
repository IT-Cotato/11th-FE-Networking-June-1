import { create } from "zustand";
import type { Project } from "../types";

interface ProjectStore {
  projects: Project[];
  selectedProjectId: number | null;
  isLoading: boolean;
  error: string | null;

  setProjects: (projects: Project[]) => void;
  setSelectedProjectId: (
    id: number | ((prev: number | null) => number)
  ) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProjectId: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setSelectedProjectId: (id) =>
    set((state) => ({
      selectedProjectId:
        typeof id === "function" ? id(state.selectedProjectId) : id,
    })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
