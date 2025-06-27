import { useEffect, useState } from 'react';

export interface Project {
  id: number;
  name: string;
}

export const useProjects = (
  setSelectedProjectId: (id: number) => void,
  setError: (msg: string) => void,
) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        if (data.length > 0) setSelectedProjectId(data[0].id);
      })
      .catch(() => setError('프로젝트 로딩 실패'))
      .finally(() => setLoading(false));
  }, [setSelectedProjectId, setError]);

  return { projects, loading };
};
