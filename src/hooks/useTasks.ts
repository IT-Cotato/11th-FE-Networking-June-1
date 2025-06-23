import { useEffect, useState } from "react";
import type { Task } from "../types";

export const useTasks = (projectId: number | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId === null) return;
    setIsLoading(true);
    fetch(`/api/tasks?projectId=${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err) => setError(`할 일 로딩 실패: ${err.message}`))
      .finally(() => setIsLoading(false));
  }, [projectId]);

  const addTask = async (title: string, assigneeId: number) => {
    if (!projectId) return;
    const payload = {
      projectId,
      title,
      status: "To Do",
      assigneeId,
    };

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const newTask: Task = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTaskStatus = async (taskId: number, status: Task["status"]) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updatedTask: Task = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  return {
    tasks,
    isLoading,
    taskError: error,
    addTask,
    updateTaskStatus,
  };
};
