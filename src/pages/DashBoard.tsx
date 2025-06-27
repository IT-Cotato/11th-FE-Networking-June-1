import { useState } from "react";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/styles/themes";
import type { StatusFilter } from "@/types/task";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";
import ErrorMessage from "@/components/ErrorMessage";

const Dashboard = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");

  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

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
      {/* 헤더 */}
      <Header />

      {/* 에러 메시지 */}
      <ErrorMessage />

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "24px",
        }}
      >
        {/* 사이드바 - 프로젝트 선택 */}
        <Sidebar
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* 새로운 할 일 추가 */}
          {selectedProjectId !== null && (
            <AddTaskForm selectedProjectId={selectedProjectId} />
          )}

          {/* 할 일 목록 */}
          {selectedProjectId !== null && (
            <div
              style={{
                backgroundColor: currentTheme.componentBg,
                padding: "20px",
                borderRadius: "12px",
                boxShadow: currentTheme.cardShadow,
                border: `1px solid ${currentTheme.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "600",
                    color: currentTheme.text,
                  }}
                >
                  할 일 목록
                </h2>
                <div
                  style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                >
                  <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      backgroundColor: currentTheme.inputBg,
                      color: currentTheme.text,
                      minWidth: "160px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#8b5cf6";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = currentTheme.border;
                    }}
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value as StatusFilter)
                    }
                    style={{
                      padding: "8px 12px",
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: "8px",
                      fontSize: "14px",
                      backgroundColor: currentTheme.inputBg,
                      color: currentTheme.text,
                      minWidth: "100px",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    <option value="All">전체</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              {/* 실제 할 일 렌더링 */}
              <TaskList
                projectId={selectedProjectId}
                searchTerm={searchTerm}
                filterStatus={filterStatus}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;