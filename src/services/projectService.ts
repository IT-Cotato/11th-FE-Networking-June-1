import { apiClient } from "./apiClient";
import type { Project } from "@/types/project";
import { getErrorMessage } from "@/utils/errorHandler";

export const handleGetProjects = async (): Promise<Project[]> => {
  try {
    const res = await apiClient.get<Project[]>("/projects");
    return res.data;
  } catch(err) {
    throw new Error(getErrorMessage(err, "프로젝트 로딩"));
  }
};