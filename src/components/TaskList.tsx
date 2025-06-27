import TaskCard from "./TaskCard";
import { useTasks } from "@/hooks/useTasks";
import type { StatusFilter } from "@/types/task";

interface Props {
  projectId: number;
  filterStatus: StatusFilter;
  searchTerm: string;
}

const TaskList = ({ projectId, filterStatus, searchTerm }: Props) => {
  const { tasks, isLoading } = useTasks(projectId);

  const filtered = tasks
    .filter((t) => filterStatus === "All" || t.status === filterStatus)
    .filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid transparent",
            borderTop: "3px solid #8b5cf6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto",
          }}
        />
        <p style={{ marginTop: "12px", color: "#6b7280", fontSize: "14px" }}>
          할 일을 불러오는 중...
        </p>
      </div>
    );

  if (filtered.length === 0)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        할 일이 없습니다.
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;