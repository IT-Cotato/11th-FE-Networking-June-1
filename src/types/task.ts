export interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}

export type Status = "To Do" | "In Progress" | "Done";

export type StatusFilter = "All" | Status;