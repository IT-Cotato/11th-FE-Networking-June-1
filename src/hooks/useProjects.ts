import { useEffect, useState } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import type { Project } from "../types/types";

export function useProjects() {
  const { setProjects, selectedProjectId, setSelectedProjectId } =
    useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("프로젝트 응답 오류");
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0 && selectedProjectId === null) {
          setSelectedProjectId(data[0].id);
        }
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, error };
}
