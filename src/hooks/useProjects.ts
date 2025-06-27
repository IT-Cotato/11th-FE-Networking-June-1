import { useQuery } from "@tanstack/react-query";
import { handleGetProjects } from "@/services/projectService";
import type { Project } from "@/types/project";

export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: handleGetProjects,
    staleTime: 5 * 60 * 1000,
  });