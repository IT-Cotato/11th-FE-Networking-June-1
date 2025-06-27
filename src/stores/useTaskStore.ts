import { create } from "zustand";
import type { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  isLoadingTask: boolean;
  taskError: string | null;
  newTaskTitle: string;
  newTaskAssignee: string;

  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
  setIsLoadingTask: (value: boolean) => void;
  setTaskError: (value: string | null) => void;
  setNewTaskTitle: (title: string) => void;
  setNewTaskAssignee: (assignee: string | ((prev: string) => string)) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isLoadingTask: false,
  taskError: null,
  newTaskTitle: "",
  newTaskAssignee: "",

  setTasks: (tasks) =>
    set((state) => ({
      tasks: typeof tasks === "function" ? tasks(state.tasks) : tasks,
    })),
  setIsLoadingTask: (value) => set({ isLoadingTask: value }),
  setTaskError: (taskError) => set({ taskError }),
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),
  setNewTaskAssignee: (assignee) =>
    set((state) => ({
      newTaskAssignee:
        typeof assignee === "function"
          ? assignee(state.newTaskAssignee)
          : assignee,
    })),
}));
