import { useEffect } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import type { Project } from "../types";

export const useProjects = () => {
  const { setProjects, setSelectedProjectId, setIsLoading, setError } =
    useProjectStore();

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
        setError(null);
      })
      .catch((err) => {
        setError(`프로젝트 로딩 실패: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setProjects, setSelectedProjectId, setIsLoading, setError]);
};
