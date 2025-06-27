import { create } from "zustand";
import type { Task, Status } from "../types/types";

type State = {
  tasks: Task[];
};

type Actions = {
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: number, newStatus: Status) => void;
};

export const useTaskStore = create<State & Actions>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    })),
}));
