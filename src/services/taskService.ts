import { apiClient } from "./apiClient";
import type { Task, Status } from "@/types/task"
import { getErrorMessage } from "@/utils/errorHandler";

export const handleGetTasks = async (projectId: number) => {
  try {
    const res = await apiClient.get<Task[]>(`/tasks`, {
    params: { projectId },
  });
  return res.data;
  } catch (err) {
     throw new Error(getErrorMessage(err, "할 일 로딩"));
  }
};

export const handleAddTask = async (task: Omit<Task, "id">) => {
  try {
    const res = await apiClient.post<Task>("/tasks", task);
    return res.data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "할 일 추가"));
  }
};

export const handleStatusChange = async (taskId: number, newStatus: Status) => {
  try {
    const res = await apiClient.patch<Task>(`/tasks/${taskId}`, { newStatus });
    return res.data;
  } catch (err) {
    throw new Error(getErrorMessage(err, "할 일 상태 변경"));
  }
};