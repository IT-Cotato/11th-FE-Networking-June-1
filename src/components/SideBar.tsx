import { useTheme } from "../hooks/useTheme";
import { useProjectStore } from "../stores/useProjectStore";

export default function SideBar() {
  const {
    projects,
    isLoadingProject,
    selectedProjectId,
    setSelectedProjectId,
  } = useProjectStore();
  const currentTheme = useTheme();

  return (
    <aside
      className="p-5 rounded-xl top-5 h-fit"
      style={{
        backgroundColor: currentTheme.componentBg,
        boxShadow: currentTheme.cardShadow,
        border: `1px solid ${currentTheme.border}`,
      }}
    >
      <h2
        className="text-lg font-semibold mb-4"
        style={{
          color: currentTheme.text,
        }}
      >
        프로젝트
      </h2>
      {isLoadingProject ? (
        <div className=" text-center p-5">
          <div className="w-6 h-6 border-2 border-transparent border-t-violet-500 rounded-full animate-spin mx-auto " />
          <p className="mt-2 text-gray-500 text-sm">로딩 중...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className="px-4 py-3 w-full text-left rounded-lg text-sm transition-all"
              style={{
                background:
                  selectedProjectId === p.id
                    ? currentTheme.selectedItemBg
                    : "transparent",
                color:
                  selectedProjectId === p.id
                    ? currentTheme.selectedItemText
                    : currentTheme.text,
                fontWeight: selectedProjectId === p.id ? "500" : "400",
              }}
              onMouseEnter={(e) => {
                if (selectedProjectId !== p.id) {
                  e.currentTarget.style.backgroundColor = currentTheme.hoverBg;
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
}
