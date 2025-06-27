import { useState, useEffect } from "react";
import type { Task, Status } from "../types";

export function useTasks(selectedProjectId: number | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProjectId === null) return;

    setIsLoading(true);
    fetch(`/api/tasks?projectId=${selectedProjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err) => setError(`할 일 로딩 실패: ${err.message}`))
      .finally(() => setIsLoading(false));
  }, [selectedProjectId]);

  const addTask = async (
    title: string,
    assigneeId: number,
    projectId: number
  ) => {
    const newTaskPayload = {
      projectId,
      title,
      status: "To Do" as Status,
      assigneeId,
    };

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskPayload),
    });

    if (!response.ok) throw new Error("할 일 추가 실패");

    const addedTask: Task = await response.json();
    setTasks((prev) => [...prev, addedTask]);
  };

  const updateStatus = async (taskId: number, newStatus: Status) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error("상태 변경 실패");

    const updatedTask: Task = await response.json();
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  return { tasks, isLoading, error, addTask, updateStatus };
}
