import React from "react";
import type { User, Theme } from "../types";

interface TaskFormProps {
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (id: string) => void;
  users: User[];
  isLoadingUsers: boolean;
  isLoading: boolean;
  handleAddTask: (e: React.FormEvent<HTMLFormElement>) => void;
  currentTheme: Theme;
}

export default function TaskForm({
  newTaskTitle,
  setNewTaskTitle,
  newTaskAssignee,
  setNewTaskAssignee,
  users,
  isLoadingUsers,
  isLoading,
  handleAddTask,
  currentTheme,
}: TaskFormProps) {
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
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "18px",
          fontWeight: "600",
          color: currentTheme.text,
        }}
      >
        새로운 할 일 추가
      </h3>
      <form
        onSubmit={handleAddTask}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="할 일 제목을 입력하세요..."
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "10px 12px",
            border: `1px solid ${currentTheme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            transition: "border-color 0.2s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#8b5cf6";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = currentTheme.border;
          }}
        />
        <select
          value={newTaskAssignee}
          onChange={(e) => setNewTaskAssignee(e.target.value)}
          style={{
            padding: "10px 12px",
            border: `1px solid ${currentTheme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            minWidth: "140px",
            cursor: "pointer",
            outline: "none",
          }}
          disabled={isLoadingUsers}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            cursor: isLoading ? "not-allowed" : "pointer",
            background: isLoading ? "#9ca3af" : currentTheme.buttonBg,
            color: currentTheme.buttonText,
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            opacity: isLoading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.opacity = "0.9";
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.opacity = "1";
            }
          }}
        >
          {isLoading ? "추가 중..." : "추가"}
        </button>
      </form>
    </div>
  );
}
