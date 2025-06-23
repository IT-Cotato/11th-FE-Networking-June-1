import React, { useState } from "react";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTasks } from "./hooks/useTasks";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
// import type { Status, StatusFilter } from "./types";

function App() {
  // --- 필터 및 입력값 상태 ---
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");

  // --- 커스텀 훅 ---
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    isLoadingProjects,
    projectError,
  } = useProjects();

  const { users, isLoadingUsers, userError } = useUsers((firstId) => {
    if (newTaskAssignee === "") {
      setNewTaskAssignee(firstId);
    }
  });

  const {
    tasks,
    isLoading: isLoadingTasks,
    taskError,
    addTask,
    updateTaskStatus,
  } = useTasks(selectedProjectId);

  const { themeName, theme: currentTheme, toggleTheme } = useTheme();

  // --- 에러 병합 ---
  const error = projectError || userError || taskError;

  // --- 할 일 추가 핸들러 ---
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee) return;
    addTask(newTaskTitle, parseInt(newTaskAssignee));
    setNewTaskTitle("");
  };

  // --- 상태 변경 핸들러 ---
  const handleStatusChange = (taskId: number, newStatus: Status) => {
    updateTaskStatus(taskId, newStatus);
  };

  const isLoading = isLoadingProjects || isLoadingUsers || isLoadingTasks;

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
      <Header themeName={themeName} onToggleTheme={toggleTheme} />

      {error && (
        <div
          style={{
            backgroundColor: currentTheme.error.background,
            color: currentTheme.error.color,
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: `1px solid ${currentTheme.error.border}`,
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

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
          onSelectProject={setSelectedProjectId}
          isLoading={isLoadingProjects}
          theme={currentTheme}
        />

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TaskForm
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskAssignee={newTaskAssignee}
            setNewTaskAssignee={setNewTaskAssignee}
            onSubmit={handleAddTask}
            users={users}
            isLoading={isLoading}
            theme={currentTheme}
          />

          <TaskList
            tasks={tasks}
            users={users}
            filterStatus={filterStatus}
            searchTerm={searchTerm}
            onFilterChange={setFilterStatus}
            onSearchChange={setSearchTerm}
            onStatusChange={handleStatusChange}
            isLoading={isLoadingTasks}
            theme={currentTheme}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
