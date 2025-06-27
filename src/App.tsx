import React, { useState } from "react";
import type { StatusFilter, Status, Theme, ThemeName } from "./types";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTasks } from "./hooks/useTasks";
import { useThemeMode } from "./hooks/useThemeMode";

export default function App() {
  const themes: Record<ThemeName, Theme> = {
    light: {
      background: "#fafafa",
      text: "#1a1a1a",
      componentBg: "#ffffff",
      border: "#e5e7eb",
      buttonBg: "#8b5cf6",
      buttonText: "#ffffff",
      selectedItemBg: "#8b5cf6",
      selectedItemText: "#ffffff",
      cardShadow:
        "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
      hoverBg: "#f9fafb",
      inputBg: "#ffffff",
      statusColors: {
        "To Do": "#ef4444",
        "In Progress": "#f59e0b",
        Done: "#10b981",
      },
      error: {
        background: "#fef2f2",
        color: "#dc2626",
        border: "#fecaca",
      },
    },
    dark: {
      background: "#0a0a0a",
      text: "#f5f5f5",
      componentBg: "#1a1a1a",
      border: "#2a2a2a",
      buttonBg: "#8b5cf6",
      buttonText: "#ffffff",
      selectedItemBg: "#8b5cf6",
      selectedItemText: "#ffffff",
      cardShadow:
        "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)",
      hoverBg: "#262626",
      inputBg: "#1a1a1a",
      statusColors: {
        "To Do": "#f87171",
        "In Progress": "#fbbf24",
        Done: "#34d399",
      },
      error: {
        background: "#1f1415",
        color: "#fca5a5",
        border: "#3f1518",
      },
    },
  };

  const { themeName, toggleTheme } = useThemeMode();
  const currentTheme = themes[themeName];

  const { projects, isLoading: isLoadingProjects } = useProjects();
  const { users, isLoading: isLoadingUsers } = useUsers();

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const {
    tasks,
    isLoading: isLoadingTasks,
    addTask,
    updateStatus,
  } = useTasks(selectedProjectId);

  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");

  const isLoading = isLoadingProjects || isLoadingUsers || isLoadingTasks;

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee || selectedProjectId === null) return;
    try {
      await addTask(newTaskTitle, parseInt(newTaskAssignee), selectedProjectId);
      setNewTaskTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: Status) => {
    try {
      await updateStatus(taskId, newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "20px",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      <Header
        themeName={themeName}
        toggleTheme={toggleTheme}
        currentTheme={currentTheme}
      />

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "24px",
        }}
      >
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          isLoading={isLoadingProjects}
          currentTheme={currentTheme}
        />

        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TaskForm
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskAssignee={newTaskAssignee}
            setNewTaskAssignee={setNewTaskAssignee}
            users={users}
            isLoadingUsers={isLoadingUsers}
            isLoading={isLoading}
            handleAddTask={handleAddTask}
            currentTheme={currentTheme}
          />
          <TaskList
            tasks={tasks}
            users={users}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoadingTasks}
            currentTheme={currentTheme}
            handleStatusChange={handleStatusChange}
          />
        </section>
      </main>
    </div>
  );
}
