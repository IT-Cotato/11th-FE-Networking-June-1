import { useFetchProjects } from "../hooks/useFetchProjects";
import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchTasks } from "../hooks/useFetchTasks";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import ErrorBanner from "../components/ErrorBanner";
import { useTheme } from "../hooks/useTheme";
import { useProjectStore } from "../stores/useProjectStore";
import { useTaskStore } from "../stores/useTaskStore";
import { useUserStore } from "../stores/useUserStore";

export default function Dashboard() {
  useFetchProjects();
  useFetchUser();
  useFetchTasks();

  const { isLoadingTask, taskError } = useTaskStore();
  const { isLoadingUser, userError } = useUserStore();
  const { isLoadingProject, projectError } = useProjectStore();
  const currentTheme = useTheme();
  const isLoading = isLoadingProject || isLoadingTask || isLoadingUser;
  const error = projectError || taskError || userError;

  /**
   * DashBoard 렌더링
   */
  return (
    <div
      className="min-h-screen p-5 transition-colors duration-200"
      style={{ background: currentTheme.background, color: currentTheme.text }}
    >
      <Header />

      {error && <ErrorBanner message={error} />}

      <main className="grid grid-cols-[320px_1fr] gap-6">
        <SideBar />
        <section className="flex flex-col gap-5">
          <TaskForm isLoading={isLoading} />
          <TaskList />
        </section>
      </main>
    </div>
  );
}
