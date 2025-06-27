import type { Task, User, Theme, StatusFilter, Status } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  users: User[];
  filterStatus: StatusFilter;
  setFilterStatus: (status: StatusFilter) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  currentTheme: Theme;
  handleStatusChange: (taskId: number, newStatus: Status) => void;
}

export default function TaskList({
  tasks,
  users,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  isLoading,
  currentTheme,
  handleStatusChange,
}: TaskListProps) {
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
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#8b5cf6";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = currentTheme.border;
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
            <TaskItem
              key={task.id}
              task={task}
              users={users}
              currentTheme={currentTheme}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
