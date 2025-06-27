import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddTask } from "@/services/taskService";
import { useUsers } from "@/hooks/useUsers";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/styles/themes";

interface Props {
  selectedProjectId: number;
}

const AddTaskForm = ({ selectedProjectId }: Props) => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading: isUsersLoading } = useUsers();
  const { themeName } = useThemeStore();
   const currentTheme = themes[themeName];

  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: handleAddTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", selectedProjectId] });
      setTitle("");
      setAssigneeId("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !assigneeId) return;
    addTask({
      title,
      assigneeId: Number(assigneeId),
      status: "To Do",
      projectId: selectedProjectId,
    });
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
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
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
                disabled={isUsersLoading}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isPending}
                style={{
                  padding: "10px 20px",
                  cursor: isPending ? "not-allowed" : "pointer",
                  background: isPending ? "#9ca3af" : currentTheme.buttonBg,
                  color: currentTheme.buttonText,
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  opacity: isPending ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isPending) {
                    e.currentTarget.style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPending) {
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                {isPending ? "추가 중..." : "추가"}
              </button>
            </form>
          </div>
  );
};

export default AddTaskForm;