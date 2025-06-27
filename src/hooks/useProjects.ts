import { useState, useEffect } from "react";
import type { Project } from "../types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Project[]) => setProjects(data))
      .catch((err) => setError(`프로젝트 로딩 실패: ${err.message}`))
      .finally(() => setIsLoading(false));
  }, []);

  return { projects, isLoading, error };
}
