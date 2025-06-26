import { create } from "zustand";
import type { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: (projectId: number) => Promise<void>;
  addTask: (
    title: string,
    assigneeId: number,
    projectId: number
  ) => Promise<void>;
  updateTaskStatus: (taskId: number, status: Task["status"]) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/tasks?projectId=${projectId}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data: Task[] = await res.json();
      set({ tasks: data });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: `할 일 로딩 실패: ${err.message}` });
      } else {
        set({ error: "할 일 로딩 실패: 알 수 없는 오류" });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (title, assigneeId, projectId) => {
    try {
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

      if (!res.ok) {
        throw new Error(`할 일 추가 실패: ${res.statusText}`);
      }

      const newTask: Task = await res.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: `할 일 추가 실패: ${err.message}` });
      } else {
        set({ error: "할 일 추가 실패: 알 수 없는 오류" });
      }
    }
  },

  updateTaskStatus: async (taskId, status) => {
    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updatedTask: Task = await res.json();
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
    }));
  },
}));
