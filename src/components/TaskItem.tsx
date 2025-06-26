import React from "react";
import type { Task, Theme } from "../types";

interface TaskItemProps {
  task: Task;
  assigneeName: string;
  theme: Theme;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  assigneeName,
  theme,
  onStatusChange,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        borderRadius: "8px",
        border: `1px solid ${theme.border}`,
        backgroundColor: theme.componentBg,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.componentBg;
      }}
    >
      {/* 할 일 제목 */}
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: "14px", color: theme.text }}>
          {task.title}
        </span>
      </div>

      {/* 담당자 + 상태 변경 드롭다운 */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* 담당자 이름 배지 */}
        <span
          style={{
            padding: "4px 8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.hoverBg,
            borderRadius: "6px",
            fontSize: "12px",
            color: theme.text,
          }}
        >
          {assigneeName}
        </span>

        {/* 상태 변경 드롭다운 */}
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          style={{
            padding: "6px 8px",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            backgroundColor: theme.statusColors[task.status],
            color: "#fff",
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
};

export default TaskItem;
