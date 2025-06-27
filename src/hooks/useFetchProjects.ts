import { useEffect } from "react";
import type { Project } from "../types";
import { useProjectStore } from "../stores/useProjectStore";

/** 프로젝트 목록 가져오기 */

export const useFetchProjects = () => {
  const {
    setProjects,
    setSelectedProjectId,
    setIsLoadingProject,
    setProjectError,
  } = useProjectStore();

  useEffect(() => {
    setIsLoadingProject(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok ");
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId((prev) => prev ?? data[0].id);
        }
        setProjectError(null);
      })
      .catch((err: Error) =>
        setProjectError(`프로젝트 로딩 실패: ${err.message}`)
      )
      .finally(() => setIsLoadingProject(false));
  }, [setProjects, setSelectedProjectId, setIsLoadingProject, setProjectError]);
};
