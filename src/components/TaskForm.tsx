import React, { useState, useEffect } from "react";
import type { User, Theme } from "../types";

export interface TaskFormProps {
  onSubmit: (title: string, assigneeId: string) => void;
  users: User[];
  isLoading: boolean;
  theme: Theme;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  users,
  isLoading,
  theme,
}) => {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");

  // 사용자 목록이 바뀔 때 초기 담당자 설정
  useEffect(() => {
    if (users.length > 0 && !assignee) {
      setAssignee(String(users[0].id));
    }
  }, [users, assignee]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !assignee) return;
    onSubmit(title, assignee);
    setTitle("");
    setAssignee(users.length > 0 ? String(users[0].id) : "");
  };

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
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            outline: "none",
          }}
        />

        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
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
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? "추가 중..." : "추가"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
