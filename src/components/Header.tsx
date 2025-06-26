import React from "react";

// 헤더 컴포넌트 props 타입 정의
interface HeaderProps {
  themeName: "light" | "dark";
  onToggleTheme: () => void;
}

/**
 * 앱 최상단 헤더 UI
 * - 제목을 표시하고, 다크/라이트 모드를 전환할 수 있는 버튼 제공
 */
const Header: React.FC<HeaderProps> = ({ themeName, onToggleTheme }) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        padding: "20px 24px",
        backgroundColor: themeName === "light" ? "#ffffff" : "#1a1a1a",
        borderRadius: "12px",
        boxShadow:
          themeName === "light"
            ? "0 1px 3px rgba(0, 0, 0, 0.05)"
            : "0 1px 3px rgba(0, 0, 0, 0.3)",
        border:
          themeName === "light" ? "1px solid #e5e7eb" : "1px solid #2a2a2a",
      }}
    >
      {/* 대시보드 제목 */}
      <h1
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "600",
          color: themeName === "light" ? "#1a1a1a" : "#f5f5f5",
        }}
      >
        프로젝트 대시보드
      </h1>

      {/* 테마 토글 버튼 */}
      <button
        onClick={onToggleTheme}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          background: "#8b5cf6",
          color: "#ffffff",
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
        {/* 🌙: 다크 모드로 전환 / ☀️: 라이트 모드로 전환 */}
        {themeName === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
};

export default Header;
