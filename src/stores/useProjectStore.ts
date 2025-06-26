import { create } from "zustand";
import type { Project } from "../types/types";

type ProjectStore = {
  projects: Project[];
  selectedProjectId: number | null;
  setProjects: (projects: Project[]) => void;
  setSelectedProjectId: (id: number | null) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProjectId: null,
  setProjects: (projects) => set({ projects }),
  setSelectedProjectId: (id) => set({ selectedProjectId: id }),
}));
