import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/styles/themes";

const Header = () => {
  const { themeName, toggleTheme } = useThemeStore();
   const currentTheme = themes[themeName];

  return (
    <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          padding: "20px 24px",
          backgroundColor: currentTheme.componentBg,
          borderRadius: "12px",
          boxShadow: currentTheme.cardShadow,
          border: `1px solid ${currentTheme.border}`,
        }}
      >
      <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "600",
            color: currentTheme.text,
          }}
        >
          프로젝트 대시보드
        </h1>
      <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            background: currentTheme.buttonBg,
            color: currentTheme.buttonText,
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
};

export default Header;