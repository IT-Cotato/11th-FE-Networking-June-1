import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";

// --- 타입 정의 ---
interface Project {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  projectId: number;
  title: string;
  status: Status;
  assigneeId: number;
}

type Status = "To Do" | "In Progress" | "Done";
type StatusFilter = "All" | Status;

interface Theme {
  background: string;
  text: string;
  componentBg: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  selectedItemBg: string;
  selectedItemText: string;
  cardShadow: string;
  hoverBg: string;
  inputBg: string;
  statusColors: {
    "To Do": string;
    "In Progress": string;
    Done: string;
  };
  error: {
    background: string;
    color: string;
    border: string;
  };
}

type ThemeName = "light" | "dark";

// --- 스타일 객체 ---
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
    cardShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
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
    cardShadow: "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)",
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

function App() {
  // --- 상태 타입 지정 ---
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");

  // --- 데이터 페칭 로직 ---
  useEffect(() => {
    setIsLoadingProjects(true);
    setIsLoadingUsers(true);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Project[]) => {
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId((prevId) => {
            if (prevId === null) {
              return data[0].id;
            }
            return prevId;
          });
        }
      })
      .catch((err: Error) => setError(`프로젝트 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingProjects(false));
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        if (data.length > 0) {
          setNewTaskAssignee((prevAssignee) => {
            if (prevAssignee === "") {
              return String(data[0].id);
            }

            return prevAssignee;
          });
        }
      })
      .catch((err: Error) => setError(`사용자 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingUsers(false));
  }, []);

  useEffect(() => {
    if (selectedProjectId === null) return;
    setIsLoadingTasks(true);
    fetch(`/api/tasks?projectId=${selectedProjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Task[]) => setTasks(data))
      .catch((err: Error) => setError(`할 일 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingTasks(false));
  }, [selectedProjectId]);

  // --- 이벤트 핸들러 ---
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee || selectedProjectId === null) return;

    const newTaskPayload = {
      projectId: selectedProjectId,
      title: newTaskTitle,
      status: "To Do" as Status,
      assigneeId: parseInt(newTaskAssignee),
    };

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskPayload),
    });
    const addedTask: Task = await response.json();
    setTasks((prev) => [...prev, addedTask]);
    setNewTaskTitle("");
  };

  const handleStatusChange = async (taskId: number, newStatus: Status) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updatedTask: Task = await response.json();
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  // --- 필터링/검색 로직 ---
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => filterStatus === "All" || task.status === filterStatus)
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filterStatus, searchTerm]);

  // --- UI 렌더링 ---
  const currentTheme = themes[themeName];
  const isLoading = isLoadingProjects || isLoadingTasks || isLoadingUsers;

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
        onToggleTheme={() =>
          setThemeName((t) => (t === "light" ? "dark" : "light"))
        }
      />

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
        <aside
          style={{
            backgroundColor: currentTheme.componentBg,
            padding: "20px",
            borderRadius: "12px",
            boxShadow: currentTheme.cardShadow,
            height: "fit-content",
            position: "sticky",
            top: "20px",
            border: `1px solid ${currentTheme.border}`,
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              fontSize: "18px",
              fontWeight: "600",
              color: currentTheme.text,
            }}
          >
            프로젝트
          </h2>
          {isLoadingProjects ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "2px solid transparent",
                  borderTop: "2px solid #8b5cf6",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto",
                }}
              />
              <p
                style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}
              >
                로딩 중...
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    background:
                      selectedProjectId === p.id
                        ? currentTheme.selectedItemBg
                        : "transparent",
                    color:
                      selectedProjectId === p.id
                        ? currentTheme.selectedItemText
                        : currentTheme.text,
                    transition: "all 0.2s ease",
                    fontWeight: selectedProjectId === p.id ? "500" : "400",
                    border: "none",
                    fontSize: "14px",
                    textAlign: "left",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedProjectId !== p.id) {
                      e.currentTarget.style.backgroundColor =
                        currentTheme.hoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedProjectId !== p.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </aside>

        <section
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
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
              onSubmit={handleAddTask}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
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
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
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
                disabled={isLoadingUsers}
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
                  background: isLoading ? "#9ca3af" : currentTheme.buttonBg,
                  color: currentTheme.buttonText,
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  opacity: isLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                {isLoading ? "추가 중..." : "추가"}
              </button>
            </form>
          </div>

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
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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

            {isLoadingTasks ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "3px solid transparent",
                    borderTop: "3px solid #8b5cf6",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto",
                  }}
                />
                <p
                  style={{
                    marginTop: "12px",
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  할 일을 불러오는 중...
                </p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                할 일이 없습니다
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      borderRadius: "8px",
                      border: `1px solid ${currentTheme.border}`,
                      backgroundColor: currentTheme.componentBg,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        currentTheme.hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        currentTheme.componentBg;
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: currentTheme.text,
                        }}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 8px",
                          backgroundColor: currentTheme.hoverBg,
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: currentTheme.text,
                          border: `1px solid ${currentTheme.border}`,
                        }}
                      >
                        {users.find((u) => u.id === task.assigneeId)?.name ||
                          "미지정"}
                      </span>
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value as Status)
                        }
                        style={{
                          padding: "6px 8px",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: "pointer",
                          backgroundColor:
                            currentTheme.statusColors[task.status],
                          color: "#ffffff",
                          minWidth: "100px",
                          outline: "none",
                        }}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
