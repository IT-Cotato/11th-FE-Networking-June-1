// 테마
export type ThemeName = "light" | "dark";

export interface Theme {
  background: string;
  text: string;
  componentBg: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  selectedItemBg: string;
  selectedItemText: string;
  cardShadow: string;
  hoverBg: string;
  inputBg: string;
  statusColors: {
    "To Do": string;
    "In Progress": string;
    Done: string;
  };
  error: {
    background: string;
    color: string;
    border: string;
  };
}

// 프로젝트
export interface Project {
  id: number;
  name: string;
}

// 사용자
export interface User {
  id: number;
  name: string;
}

// 할 일(Task)
export type Status = "To Do" | "In Progress" | "Done";
export type StatusFilter = "All" | Status;

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}
