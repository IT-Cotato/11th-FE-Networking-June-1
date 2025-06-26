import React, { useEffect, useCallback } from "react";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTheme } from "./hooks/useTheme";
import { useNewTaskForm } from "./stores/useNewTaskForm";
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

  // 사용자 데이터 로딩 + 최초 사용자 자동 할당
  const handleFirstUserId = useCallback(
    (firstId: string) => {
      if (newTaskAssignee === "") {
        setNewTaskAssignee(firstId);
      }
    },
    [newTaskAssignee, setNewTaskAssignee]
  );
  const { users, isLoadingUsers, userError } = useUsers(handleFirstUserId);

  // 할 일 데이터 관련 상태 및 메서드
  const {
    tasks,
    isLoading: isLoadingTasks,
    error: taskError,
    fetchTasks,
    addTask,
    updateTaskStatus,
  } = useTaskStore();

  // 선택된 프로젝트 변경 시 할 일 목록 로드
  useEffect(() => {
    if (selectedProjectId) {
      fetchTasks(selectedProjectId);
    }
  }, [selectedProjectId, fetchTasks]);

  // 필터 및 검색 상태
  const { filterStatus, setFilterStatus, searchTerm, setSearchTerm } =
    useTaskFilters();

  // 테마 상태 및 토글 함수
  const { themeName, theme: currentTheme, toggleTheme } = useTheme();

  // 모든 API의 로딩/에러 상태 통합
  const error = projectError || userError || taskError;
  const isLoadingAll = isLoading || isLoadingUsers || isLoadingTasks;

  // 새 할 일 추가 핸들러
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 제목, 담당자, 프로젝트가 선택되어야만 추가 가능
    if (!newTaskTitle || !newTaskAssignee || selectedProjectId === null) {
      console.warn("조건 미충족으로 작업 종료");
      return;
    }

    addTask(newTaskTitle, parseInt(newTaskAssignee), selectedProjectId);
    resetForm(); // 입력 초기화
  };

  // 개별 할 일의 상태 변경 핸들러
  const handleStatusChange = (taskId: number, newStatus: Status) => {
    updateTaskStatus(taskId, newStatus);
  };

  // 프로젝트 변경 시 필터 및 폼 초기화
  useEffect(() => {
    resetForm();
    setFilterStatus("All");
    setSearchTerm("");
  }, [selectedProjectId, resetForm, setFilterStatus, setSearchTerm]);

  // 렌더링
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
      {/* 상단 헤더: 테마 토글 */}
      <Header themeName={themeName} onToggleTheme={toggleTheme} />

      {/* 에러 메시지 출력 */}
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
        {/* 좌측: 프로젝트 목록 */}
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
          isLoading={isLoading}
          theme={currentTheme}
        />

        {/* 우측: 할 일 추가 및 목록 */}
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
