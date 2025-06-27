import React from 'react';
import type { ThemeName } from '../hooks/useTheme';
import { themes } from '../hooks/useTheme';

interface Props {
  themeName: ThemeName;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeName>>;
}
export default function ThemeToggle({ themeName, setThemeName }: Props) {
  const currentTheme = themes[themeName];
  return (
    <button
      onClick={() => setThemeName(t => (t === 'light' ? 'dark' : 'light'))}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        background: currentTheme.buttonBg,
        color: currentTheme.buttonText,
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = '0.9';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      {themeName === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
