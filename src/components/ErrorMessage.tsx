import { useErrorStore } from "@/stores/useErrorStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { themes } from "@/styles/themes";

const ErrorMessage = () => {
  const { error } = useErrorStore();
  const themeName = useThemeStore((state) => state.themeName);
  const currentTheme = themes[themeName];

  if (!error) return null;

  return (
   <div
          style={{
            backgroundColor: currentTheme.error.background,
            color: currentTheme.error.color,
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: `1px solid ${currentTheme.error.border}`,
            fontSize: "14px",
          }}
        >
          {error}
        </div>
  );
};

export default ErrorMessage;
