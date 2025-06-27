import { useProjectStore } from "../stores/useProjectStore";
import { useTaskStore } from "../stores/useTaskStore";
import type { Task, Status } from "../types";
import { useCallback } from "react";

/**
 *
 * 할 일 추가 커스텀 훅
 */

export const useAddTask = () => {
  const { selectedProjectId } = useProjectStore();
  const { newTaskTitle, newTaskAssignee, setTasks, setNewTaskTitle } =
    useTaskStore();

  const addTask = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newTaskTitle || !newTaskAssignee || selectedProjectId === null)
        return;

      const newTaskPayload = {
        projectId: selectedProjectId,
        title: newTaskTitle,
        status: "To Do" as Status,
        assigneeId: parseInt(newTaskAssignee),
      };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskPayload),
      });

      const addedTask: Task = await response.json();
      setTasks((prev) => [...prev, addedTask]);
      setNewTaskTitle("");
    },
    [
      newTaskTitle,
      newTaskAssignee,
      selectedProjectId,
      setTasks,
      setNewTaskTitle,
    ]
  );

  return { addTask };
};
