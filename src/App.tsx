import React, { useEffect, useCallback } from "react";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTheme } from "./hooks/useTheme";
import { useNewTaskForm } from "./hooks/useNewTaskForm";
import { useTaskFilters } from "./hooks/useTaskFilters";
import { useProjectStore } from "./stores/useProjectStore";
import { useTaskStore } from "./stores/useTaskStore";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import type { Status, StatusFilter } from "./types";

function App() {
  // 전역 프로젝트 상태
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    isLoading,
    error: projectError,
  } = useProjectStore();

  // 프로젝트 데이터 초기 로딩 (1회)
  useProjects();

  // TaskForm 상태
  const { newTaskTitle, newTaskAssignee, setNewTaskAssignee, resetForm } =
    useNewTaskForm();

  // 사용자 데이터
  const handleFirstUserId = useCallback(
    (firstId: string) => {
      setNewTaskAssignee((prev) => (prev === "" ? firstId : prev));
    },
    [setNewTaskAssignee]
  );

  const { users, isLoadingUsers, userError } = useUsers(handleFirstUserId);

  // 할 일 데이터
  const {
    tasks,
    isLoading: isLoadingTasks,
    error: taskError,
    fetchTasks,
    addTask,
    updateTaskStatus,
  } = useTaskStore();

  // 프로젝트 변경 시 할 일 목록 로드
  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks(selectedProjectId);
    }
  }, [selectedProjectId, fetchTasks]);

  // 필터
  const { filterStatus, setFilterStatus, searchTerm, setSearchTerm } =
    useTaskFilters();

  // 테마
  const { themeName, theme: currentTheme, toggleTheme } = useTheme();

  // 종합 로딩/에러
  const error = projectError || userError || taskError;
  const isLoadingAll = isLoading || isLoadingUsers || isLoadingTasks;

  // 새 할 일 추가
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee || selectedProjectId === null) return;
    addTask(newTaskTitle, parseInt(newTaskAssignee), selectedProjectId);
    resetForm();
  };

  // 할 일 상태 변경
  const handleStatusChange = (taskId: number, newStatus: Status) => {
    updateTaskStatus(taskId, newStatus);
  };

  // 프로젝트 변경 시 필터 및 폼 초기화
  useEffect(() => {
    resetForm();
    setFilterStatus("All");
    setSearchTerm("");
  }, [selectedProjectId, resetForm, setFilterStatus, setSearchTerm]);

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
          isLoading={isLoading}
          theme={currentTheme}
        />

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TaskForm
            onSubmit={handleAddTask}
            users={users}
            isLoading={isLoadingAll}
            theme={currentTheme}
          />
          <TaskList
            tasks={tasks}
            users={users}
            filterStatus={filterStatus}
            searchTerm={searchTerm}
            onFilterChange={(value) => setFilterStatus(value as StatusFilter)}
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
