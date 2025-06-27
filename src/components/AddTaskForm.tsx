import React, { useState } from "react";
import type { User, Status, Task } from "../types/types";
import { useThemeStore } from "../stores/useThemeStore";
import { themes } from "../themes/theme";

interface AddTaskFormProps {
  users: User[];
  projectId: number | null;

  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  users,
  projectId,
  onTaskAdded,
}) => {
  const themeName = useThemeStore((state) => state.theme);
  const currentTheme = themes[themeName];

  const [title, setTitle] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !assigneeId || projectId === null) return;

    setIsLoading(true);
    setError(null);

    try {
      const newTaskPayload = {
        projectId,
        title,
        status: "To Do" as Status,
        assigneeId: parseInt(assigneeId),
      };

      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskPayload),
      });

      if (!res.ok) throw new Error("할 일 추가 실패");

      const addedTask: Task = await res.json();
      onTaskAdded(addedTask);
      setTitle("");
      setAssigneeId("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            border: `1px solid ${currentTheme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
          }}
        />
        <select
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          disabled={isLoading}
          style={{
            padding: "10px 12px",
            border: `1px solid ${currentTheme.border}`,
            borderRadius: "8px",
            fontSize: "14px",
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
            minWidth: "140px",
            cursor: "pointer",
          }}
        >
          <option value="">담당자 선택</option>
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
            background: isLoading ? "#9ca3af" : currentTheme.buttonBg,
            color: currentTheme.buttonText,
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          {isLoading ? "추가 중..." : "추가"}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: "12px",
            color: currentTheme.error.color,
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
