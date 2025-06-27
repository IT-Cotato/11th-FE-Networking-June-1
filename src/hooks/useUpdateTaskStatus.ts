import { useCallback } from "react";
import type { Status, Task } from "../types";
import { useTaskStore } from "../stores/useTaskStore";

/**
 *
 * 할 일의 상태를 변화시키는 커스텀 훅
 */

export const useUpdateTaskStatus = () => {
  const { setTasks } = useTaskStore();

  const updateTaskStatus = useCallback(
    async (taskId: number, newStatus: Status) => {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedTask: Task = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    },
    [setTasks]
  );

  return { updateTaskStatus };
};
