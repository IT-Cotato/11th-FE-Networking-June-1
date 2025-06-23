import React from "react";
import type { User, Theme } from "../types";

interface TaskFormProps {
  newTaskTitle: string;
  setNewTaskTitle: (val: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  users: User[];
  isLoading: boolean;
  theme: Theme;
}

const TaskForm: React.FC<TaskFormProps> = ({
  newTaskTitle,
  setNewTaskTitle,
  newTaskAssignee,
  setNewTaskAssignee,
  onSubmit,
  users,
  isLoading,
  theme,
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.inputBg,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: `1px solid ${theme.border}`,
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "18px",
          fontWeight: "600",
          color: theme.text,
        }}
      >
        새로운 할 일 추가
      </h3>

      <form
        onSubmit={onSubmit}
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
            border: `1px solid ${theme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: theme.inputBg,
            color: theme.text,
            transition: "border-color 0.2s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#8b5cf6";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.border;
          }}
        />
        <select
          value={newTaskAssignee}
          onChange={(e) => setNewTaskAssignee(e.target.value)}
          disabled={isLoading}
          style={{
            padding: "10px 12px",
            border: `1px solid ${theme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: theme.inputBg,
            color: theme.text,
            minWidth: "140px",
            cursor: "pointer",
            outline: "none",
          }}
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
            background: isLoading ? "#9ca3af" : theme.buttonBg,
            color: theme.buttonText,
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
};

export default TaskForm;
