import { create } from "zustand";

interface NewTaskFormStore {
  newTaskTitle: string; // 할 일 제목 입력값
  setNewTaskTitle: (title: string) => void; // 제목 입력 핸들러
  newTaskAssignee: string; // 할 일 담당자 선택값
  setNewTaskAssignee: (assignee: string) => void; // 담당자 설정 핸들러
  resetForm: () => void; // 폼 초기화 함수 (제목/담당자 모두 리셋)
}

export const useNewTaskForm = create<NewTaskFormStore>((set) => ({
  newTaskTitle: "",
  newTaskAssignee: "",
  setNewTaskTitle: (title) => set({ newTaskTitle: title }),
  setNewTaskAssignee: (assignee) => set({ newTaskAssignee: assignee }),
  resetForm: () => set({ newTaskTitle: "", newTaskAssignee: "" }),
}));
