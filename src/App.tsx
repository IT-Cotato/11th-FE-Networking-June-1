import React, { useEffect, useState, useMemo } from "react";
import { useThemeStore } from "./stores/useThemeStore";
import { themes } from "./themes/theme";
import type { StatusFilter } from "./types/types";

import ProjectList from "./components/ProjectList";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

import { useProjectStore } from "./stores/useProjectStore";
import { useProjects } from "./hooks/useProjects";
import { useUsers } from "./hooks/useUsers";
import { useTasks } from "./hooks/useTasks";
import Header from "./components/Header";

function App() {
  // 테마 정보
  const themeName = useThemeStore((state) => state.theme);
  const currentTheme = themes[themeName];

  // 프로젝트 관련
  const { isLoading: isLoadingProjects, error: projectError } = useProjects();
  const { projects, selectedProjectId, setSelectedProjectId } =
    useProjectStore();

  // 유저 정보
  const { users, error: userError } = useUsers();

  // 태스크 관련
  const {
    tasks,
    isLoading: isLoadingTasks,
    error: taskError,
    handleStatusChange,
    addTask,
  } = useTasks(selectedProjectId);

  // 기타 상태
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // 에러 통합 처리
  useEffect(() => {
    if (projectError || userError || taskError) {
      setError(projectError || userError || taskError);
    }
  }, [projectError, userError, taskError]);

  // 필터링된 태스크 리스트
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => filterStatus === "All" || task.status === filterStatus)
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filterStatus, searchTerm]);

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
      <Header />

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
        <aside>
          <ProjectList
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            isLoading={isLoadingProjects}
          />
        </aside>

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <AddTaskForm
            users={users}
            projectId={selectedProjectId}
            onTaskAdded={addTask}
          />

          <TaskList
            tasks={filteredTasks}
            users={users}
            isLoading={isLoadingTasks}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onStatusChange={handleStatusChange}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
