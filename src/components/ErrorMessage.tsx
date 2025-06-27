import type { ThemeName } from '../hooks/useTheme';
import { themes } from '../hooks/useTheme';

export default function ErrorMessage({
  error,
  themeName,
}: {
  error: string | null;
  themeName: ThemeName;
}) {
  if (!error) return null;
  const theme = themes[themeName];
  return (
    <div
      style={{
        backgroundColor: theme.error.background,
        color: theme.error.color,
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: `1px solid ${theme.error.border}`,
        fontSize: '14px',
      }}
    >
      {error}
    </div>
  );
}
