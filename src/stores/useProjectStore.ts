import { create } from "zustand";
import type { Project } from "../types";

/**
 * Zustand 기반 프로젝트 상태 스토어
 * - 전체 프로젝트 목록
 * - 선택된 프로젝트 ID
 * - 로딩 및 에러 상태 포함
 */
interface ProjectStore {
  projects: Project[];
  selectedProjectId: number | null;
  isLoading: boolean;
  error: string | null;

  // 상태 setter들
  setProjects: (projects: Project[]) => void;

  /**
   * 선택된 프로젝트 ID 설정
   * - 숫자 또는 이전 상태 기반 함수 모두 허용
   */
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
