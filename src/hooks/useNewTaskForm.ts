import { create } from "zustand";

interface NewTaskFormStore {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (assignee: string) => void;
  resetForm: () => void;
}

export const useNewTaskForm = create<NewTaskFormStore>((set) => ({
  newTaskTitle: "",
  newTaskAssignee: "",
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),
  setNewTaskAssignee: (assignee) => set({ newTaskAssignee: assignee }),
  resetForm: () => set({ newTaskTitle: "", newTaskAssignee: "" }),
}));
