import type { Status, StatusFilter } from "../types";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";
import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme";
import { useTaskStore } from "../stores/useTaskStore";
import { useUserStore } from "../stores/useUserStore";

export default function TaskItem({
  filterStatus,
  searchTerm,
}: {
  filterStatus: StatusFilter;
  searchTerm: string;
}) {
  const currentTheme = useTheme();
  const { isLoadingTask } = useTaskStore();
  const tasks = useTaskStore((s) => s.tasks);
  const { users } = useUserStore();
  const { updateTaskStatus } = useUpdateTaskStatus();
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => filterStatus === "All" || task.status === filterStatus)
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filterStatus, searchTerm]);

  return (
    <>
      {isLoadingTask ? (
        <div className="p-10 text-center">
          <div
            className="w-8 h-8 border-4 border-transparent border-t-violet-500 rounded-full mx-auto"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p className="mt-3 text-gray-500 text-sm">할 일을 불러오는 중...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center p-10 text-gray-500 text-sm">
          할 일이 없습니다
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center p-4 rounded-lg transition-all"
              style={{
                border: `1px solid ${currentTheme.border}`,
                backgroundColor: currentTheme.componentBg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  currentTheme.componentBg;
              }}
            >
              <div className="flex-1">
                <span
                  className="text-sm font-normal"
                  style={{ color: currentTheme.text }}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-2 py-1 text-xs rounded-md font-normal"
                  style={{
                    backgroundColor: currentTheme.hoverBg,
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
                    updateTaskStatus(task.id, e.target.value as Status)
                  }
                  className="min-w-[100px] px-2 py-1 text-xs rounded-md cursor-pointer font-medium outline-none"
                  style={{
                    backgroundColor: currentTheme.statusColors[task.status],
                    color: "#ffffff",
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
    </>
  );
}
