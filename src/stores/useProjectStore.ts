import { create } from "zustand";
import type { Project } from "../types";

interface ProjectStore {
  projects: Project[];
  selectedProjectId: number | null;
  isLoadingProject: boolean;
  projectError: string | null;

  setProjects: (projects: Project[]) => void;
  setSelectedProjectId: (
    id: number | ((prev: number | null) => number | null)
  ) => void;
  setIsLoadingProject: (value: boolean) => void;
  setProjectError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProjectId: null,
  isLoadingProject: false,
  projectError: null,

  setProjects: (projects) => set({ projects }),
  setSelectedProjectId: (id) =>
    set((state) => ({
      selectedProjectId:
        typeof id === "function" ? id(state.selectedProjectId) : id,
    })),
  setIsLoadingProject: (value) => set({ isLoadingProject: value }),
  setProjectError: (projectError) => set({ projectError }),
}));
