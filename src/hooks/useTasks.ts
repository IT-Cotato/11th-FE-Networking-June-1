import { useEffect, useState } from "react";
import { useTaskStore } from "../stores/useTaskStore";
import type { Task, Status } from "../types/types";

export const useTasks = (projectId: number | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    if (projectId === null) return;

    setIsLoading(true);
    fetch(`/api/tasks?projectId=${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("할 일 로딩 실패");
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleStatusChange = async (taskId: number, newStatus: Status) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const updatedTask: Task = await response.json();
    updateTaskStatus(taskId, updatedTask.status);
  };

  return { tasks, isLoading, error, handleStatusChange, addTask };
};
