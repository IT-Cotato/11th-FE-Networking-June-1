import { useThemeStore } from "@/stores/useThemeStore";

const Header = () => {
  const { themeName, toggleTheme } = useThemeStore();

  return (
    <header>
      <h1>프로젝트 대시보드</h1>
      <button onClick={toggleTheme}>
        {themeName === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};
export default Header;