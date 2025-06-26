import { useTheme } from "../hooks/useTheme";
import { useThemeStore } from "../stores/useThemeStore";

export default function Header() {
  const { themeName, setThemeName } = useThemeStore();
  const currentTheme = useTheme();

  return (
    <header
      className="flex justify-between item-center mb-6 px-6 py-5 rounded-xl shadow"
      style={{
        backgroundColor: currentTheme.componentBg,
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <h1
        className="text-2xl font-semibold"
        style={{
          color: currentTheme.text,
        }}
      >
        프로젝트 대시보드
      </h1>
      <button
        onClick={() => setThemeName((t) => (t === "light" ? "dark" : "light"))}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
        style={{
          background: currentTheme.buttonBg,
          color: currentTheme.buttonText,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        {themeName === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
