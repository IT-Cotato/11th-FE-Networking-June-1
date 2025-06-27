import { useProjects } from "@/hooks/useProjects";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/styles/themes";

interface Props {
  selectedProjectId: number | null;
  onSelect: (id: number) => void;
}

const Sidebar = ({ selectedProjectId, onSelect }: Props) => {
  const { data: projects = [], isLoading } = useProjects();
  const { themeName } = useThemeStore();
  const currentTheme = themes[themeName];

  return (
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
          {isLoading ? (
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
                  onClick={() => onSelect(p.id)}
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
  );
};

export default Sidebar;