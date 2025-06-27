import type { Task, User, Theme, Status } from "../types";

interface TaskItemProps {
  task: Task;
  users: User[];
  currentTheme: Theme;
  handleStatusChange: (taskId: number, newStatus: Status) => void;
}

export default function TaskItem({
  task,
  users,
  currentTheme,
  handleStatusChange,
}: TaskItemProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        border: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.componentBg,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = currentTheme.componentBg;
      }}
    >
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: currentTheme.text,
          }}
        >
          {task.title}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            padding: "4px 8px",
            backgroundColor: currentTheme.hoverBg,
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "400",
            color: currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
          }}
        >
          {users.find((u) => u.id === task.assigneeId)?.name || "미지정"}
        </span>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(task.id, e.target.value as Status)}
          style={{
            padding: "6px 8px",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            backgroundColor: currentTheme.statusColors[task.status],
            color: "#ffffff",
            minWidth: "100px",
            outline: "none",
          }}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}
