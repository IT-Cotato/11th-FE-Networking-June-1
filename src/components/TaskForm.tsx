import { useAddTask } from "../hooks/useAddTask";
import { useTheme } from "../hooks/useTheme";
import { useTaskStore } from "../stores/useTaskStore";
import { useUserStore } from "../stores/useUserStore";

export default function TaskForm({ isLoading }: { isLoading: boolean }) {
  const { newTaskTitle, setNewTaskTitle, newTaskAssignee, setNewTaskAssignee } =
    useTaskStore();
  const { users, isLoadingUser } = useUserStore();

  const currentTheme = useTheme();
  const { addTask } = useAddTask();

  return (
    <div
      className="p-5 rounded-xl"
      style={{
        backgroundColor: currentTheme.componentBg,
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: currentTheme.text }}
      >
        새로운 할 일 추가
      </h3>
      <form onSubmit={addTask} className="flex gap-3 flex-wrap">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="할 일 제목을 입력하세요..."
          className="flex-1 min-w-[200px] px-3 py-2 text-sm rounded-lg outline-none transition-colors"
          style={{
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
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
          className="px-3 py-2 min-w-[140px] text-sm rounded-lg outline-none"
          style={{
            border: `1px solid ${currentTheme.border}`,
            backgroundColor: currentTheme.inputBg,
            color: currentTheme.text,
          }}
          disabled={isLoadingUser}
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
          className="px-5 py-2 text-sm font-medium transition-all rounded-lg"
          style={{
            cursor: isLoading ? "not-allowed" : "pointer",
            background: isLoading ? "#9ca3af" : currentTheme.buttonBg,
            color: currentTheme.buttonText,
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
  );
}
