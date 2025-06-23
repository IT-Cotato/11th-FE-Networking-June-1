import { useEffect, useState } from "react";
import type { Project } from "../types";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId((prev) => prev ?? data[0].id);
        }
      })
      .catch((err) => setError(`프로젝트 로딩 실패: ${err.message}`))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    isLoadingProjects: isLoading,
    projectError: error,
  };
};
