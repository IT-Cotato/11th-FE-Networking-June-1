import React, { useEffect } from "react";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTasks } from "./hooks/useTasks";
import { useTheme } from "./hooks/useTheme";
import { useNewTaskForm } from "./hooks/useNewTaskForm";
import { useTaskFilters } from "./hooks/useTaskFilters";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Status, StatusFilter } from "./types";

function App() {
  // 프로젝트 관련 상태
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    isLoadingProjects,
    projectError,
  } = useProjects();

  // TaskForm 관련 상태 (사용자 초기화 + 상태 공유)
  const { newTaskTitle, newTaskAssignee, setNewTaskAssignee, resetForm } =
    useNewTaskForm();

  // 사용자 관련 상태
  const { users, isLoadingUsers, userError } = useUsers((firstId) => {
    if (newTaskAssignee === "") {
      setNewTaskAssignee(firstId);
    }
  });

  // 할 일 관련 상태
  const {
    tasks,
    isLoading: isLoadingTasks,
    taskError,
    addTask,
    updateTaskStatus,
  } = useTasks(selectedProjectId);

  // 필터 상태
  const { filterStatus, setFilterStatus, searchTerm, setSearchTerm } =
    useTaskFilters();

  // 테마 관련 상태
  const { themeName, theme: currentTheme, toggleTheme } = useTheme();

  // 종합 에러 및 로딩
  const error = projectError || userError || taskError;
  const isLoading = isLoadingProjects || isLoadingUsers || isLoadingTasks;

  // 새 할 일 추가
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee) return;
    addTask(newTaskTitle, parseInt(newTaskAssignee));
    resetForm();
  };

  // 할 일 상태 변경
  const handleStatusChange = (taskId: number, newStatus: Status) => {
    updateTaskStatus(taskId, newStatus);
  };

  // 프로젝트 변경 시 필터 초기화
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
          isLoading={isLoadingProjects}
          theme={currentTheme}
        />

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TaskForm
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
