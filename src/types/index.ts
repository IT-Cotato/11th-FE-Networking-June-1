export type Status = "To Do" | "In Progress" | "Done";
export type StatusFilter = "All" | Status;

export interface Project {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}

export interface User {
  id: number;
  name: string;
}
