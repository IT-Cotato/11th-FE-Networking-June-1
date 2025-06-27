import React from "react";
import type { Project } from "../types/types";
import { useThemeStore } from "../stores/useThemeStore";
import { themes } from "../themes/theme";

interface ProjectListProps {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProject: (id: number) => void;
  isLoading: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  isLoading,
}) => {
  const themeName = useThemeStore((state) => state.theme);
  const currentTheme = themes[themeName];

  if (isLoading) {
    return (
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
        <p style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}>
          로딩 중...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: currentTheme.componentBg,
        padding: "20px",
        borderRadius: "12px",
        boxShadow: currentTheme.cardShadow,
        height: "fit-content",
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
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              borderRadius: "8px",
              background:
                selectedProjectId === project.id
                  ? currentTheme.selectedItemBg
                  : "transparent",
              color:
                selectedProjectId === project.id
                  ? currentTheme.selectedItemText
                  : currentTheme.text,
              fontWeight: selectedProjectId === project.id ? "500" : "400",
              border: "none",
              fontSize: "14px",
              textAlign: "left",
              width: "100%",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedProjectId !== project.id) {
                e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedProjectId !== project.id) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {project.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
