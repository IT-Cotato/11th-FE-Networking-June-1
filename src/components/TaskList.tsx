import React from "react";
import TaskItem from "./TaskItem";
import type { Task, User, Theme, Status } from "../types";

interface TaskListProps {
  tasks: Task[];
  users: User[];
  filterStatus: string;
  searchTerm: string;
  onFilterChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (taskId: number, newStatus: Status) => void;
  isLoading: boolean;
  theme: Theme;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  users,
  filterStatus,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onStatusChange,
  isLoading,
  theme,
}) => {
  // 필터 + 검색어 기반으로 tasks 필터링
  const filteredTasks = tasks
    .filter((task) => filterStatus === "All" || task.status === filterStatus)
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      style={{
        backgroundColor: theme.componentBg,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: theme.cardShadow,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* 제목 + 검색창 + 상태 필터 */}
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
            color: theme.text,
          }}
        >
          할 일 목록
        </h2>

        {/* 검색창 + 상태 필터 */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              padding: "8px 12px",
              border: `1px solid ${theme.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: theme.inputBg,
              color: theme.text,
              minWidth: "160px",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = theme.border;
            }}
          />

          <select
            value={filterStatus}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFilterChange(e.target.value)
            }
            style={{
              padding: "8px 12px",
              border: `1px solid ${theme.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: theme.inputBg,
              color: theme.text,
              minWidth: "100px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="All">전체</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* 로딩 중 상태 */}
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
        // 필터된 할 일이 없을 경우
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
        // 필터된 할 일 리스트 출력
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredTasks.map((task) => {
            const user = users.find((u) => u.id === task.assigneeId);
            return (
              <TaskItem
                key={task.id}
                task={task}
                assigneeName={user?.name ?? "미지정"}
                theme={theme}
                onStatusChange={onStatusChange}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
