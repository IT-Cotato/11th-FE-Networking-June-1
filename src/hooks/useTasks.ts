import { useEffect, useState } from 'react';

export type Status = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}

export const useTasks = (
  projectId: number | null,
  setError: (msg: string) => void,
) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId === null) return;
    setLoading(true);
    fetch(`/api/tasks?projectId=${projectId}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setTasks)
      .catch(() => setError('할 일 로딩 실패'))
      .finally(() => setLoading(false));
  }, [projectId, setError]);

  return { tasks, setTasks, loading };
};
