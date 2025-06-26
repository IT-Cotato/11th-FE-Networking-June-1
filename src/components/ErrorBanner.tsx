import { useTheme } from "../hooks/useTheme";

export default function ErrorBanner({ message }: { message: string }) {
  const currentTheme = useTheme();
  return (
    <div
      className="mb-5 px-4 py-3 text-sm"
      style={{
        backgroundColor: currentTheme.error.background,
        color: currentTheme.error.color,
        border: `1px solid ${currentTheme.error.border}`,
      }}
    >
      {message}
    </div>
  );
}
