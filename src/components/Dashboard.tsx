import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { useUsers } from '../hooks/useUsers';
import { useTasks } from '../hooks/useTasks';
import type { ThemeName } from '../hooks/useTheme';
import { themes } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import ProjectList from './ProjectList';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ErrorMessage from './ErrorMessage';

export default function Dashboard() {
  const [themeName, setThemeName] = React.useState<ThemeName>('light');
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    number | null
  >(null);
  const [error, setError] = React.useState<string | null>(null);

  // Projects
  const { projects, loading: isLoadingProjects } = useProjects(
    setSelectedProjectId,
    setError,
  );

  // Users
  const { users, loading: isLoadingUsers } = useUsers(setError);

  // Tasks
  const {
    tasks,
    setTasks,
    loading: isLoadingTasks,
  } = useTasks(selectedProjectId, setError);

  // TaskForm state
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskAssignee, setNewTaskAssignee] = React.useState('');

  // TaskList filter/search state
  const [filterStatus, setFilterStatus] = React.useState<
    'All' | 'To Do' | 'In Progress' | 'Done'
  >('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Add Task Handler
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskAssignee || !selectedProjectId) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProjectId,
          title: newTaskTitle,
          status: 'To Do',
          assigneeId: Number(newTaskAssignee),
        }),
      });
      if (!res.ok) throw new Error();
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskAssignee('');
    } catch {
      setError('할 일 추가 실패');
    }
  };

  // Task status change
  const handleStatusChange = async (
    taskId: number,
    newStatus: 'To Do' | 'In Progress' | 'Done',
  ) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setTasks(tasks.map(t => (t.id === taskId ? updated : t)));
    } catch {
      setError('할 일 상태 변경 실패');
    }
  };

  const theme = themes[themeName];

  return (
    <div
      style={{
        background: theme.background,
        color: theme.text,
        minHeight: '100vh',
        padding: '20px',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '20px 24px',
          backgroundColor: theme.componentBg,
          borderRadius: '12px',
          boxShadow: theme.cardShadow,
          border: `1px solid ${theme.border}`,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 600,
            color: theme.text,
          }}
        >
          프로젝트 대시보드
        </h1>
        <ThemeToggle themeName={themeName} setThemeName={setThemeName} />
      </header>

      <ErrorMessage error={error} themeName={themeName} />

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: '24px',
        }}
      >
        <ProjectList
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          isLoadingProjects={isLoadingProjects}
          themeName={themeName}
        />
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <TaskForm
            users={users}
            newTaskTitle={newTaskTitle}
            setNewTaskTitle={setNewTaskTitle}
            newTaskAssignee={newTaskAssignee}
            setNewTaskAssignee={setNewTaskAssignee}
            isLoadingUsers={isLoadingUsers}
            isLoading={isLoadingTasks}
            handleAddTask={handleAddTask}
            themeName={themeName}
          />
          <TaskList
            users={users}
            tasks={tasks}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoadingTasks={isLoadingTasks}
            handleStatusChange={handleStatusChange}
            themeName={themeName}
          />
        </section>
      </main>
    </div>
  );
}
