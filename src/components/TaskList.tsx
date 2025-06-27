import React from "react";
import type { Task, User, Status, StatusFilter } from "../types/types";
import { useThemeStore } from "../stores/useThemeStore";
import { themes } from "../themes/theme";

interface TaskListProps {
  tasks: Task[];
  users: User[];
  isLoading: boolean;
  filterStatus: StatusFilter;
  setFilterStatus: (status: StatusFilter) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onStatusChange: (taskId: number, newStatus: Status) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  users,
  isLoading,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  onStatusChange,
}) => {
  const themeName = useThemeStore((state) => state.theme);
  const currentTheme = themes[themeName];

  const filteredTasks = tasks
    .filter((task) => filterStatus === "All" || task.status === filterStatus)
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      style={{
        backgroundColor: currentTheme.componentBg,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: currentTheme.text,
          }}
        >
          할 일 목록
        </h2>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: `1px solid ${currentTheme.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              minWidth: "160px",
              outline: "none",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as StatusFilter)}
            style={{
              padding: "8px 12px",
              border: `1px solid ${currentTheme.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              minWidth: "100px",
              cursor: "pointer",
            }}
          >
            <option value="All">전체</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {isLoading ? (
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
      ) : filteredTasks.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          할 일이 없습니다
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderRadius: "8px",
                border: `1px solid ${currentTheme.border}`,
                backgroundColor: currentTheme.componentBg,
              }}
            >
              <span style={{ fontSize: "14px", color: currentTheme.text }}>
                {task.title}
              </span>
              <div
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: currentTheme.text,
                    border: `1px solid ${currentTheme.border}`,
                    backgroundColor: currentTheme.hoverBg,
                  }}
                >
                  {users.find((u) => u.id === task.assigneeId)?.name ||
                    "미지정"}
                </span>
                <select
                  value={task.status}
                  onChange={(e) =>
                    onStatusChange(task.id, e.target.value as Status)
                  }
                  style={{
                    padding: "6px 8px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    cursor: "pointer",
                    backgroundColor: currentTheme.statusColors[task.status],
                    color: "#fff",
                    minWidth: "100px",
                  }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
