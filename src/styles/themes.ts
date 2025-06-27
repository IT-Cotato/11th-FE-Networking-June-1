import type { Theme, ThemeName } from "@/types/theme";

export const themes: Record<ThemeName, Theme> = {
  light: {
    background: "#fafafa",
    text: "#1a1a1a",
    componentBg: "#ffffff",
    border: "#e5e7eb",
    buttonBg: "#8b5cf6",
    buttonText: "#ffffff",
    selectedItemBg: "#8b5cf6",
    selectedItemText: "#ffffff",
    cardShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    hoverBg: "#f9fafb",
    inputBg: "#ffffff",
    statusColors: {
      "To Do": "#ef4444",
      "In Progress": "#f59e0b",
      Done: "#10b981",
    },
    error: {
      background: "#fef2f2",
      color: "#dc2626",
      border: "#fecaca",
    },
  },
  dark: {
    background: "#0a0a0a",
    text: "#f5f5f5",
    componentBg: "#1a1a1a",
    border: "#2a2a2a",
    buttonBg: "#8b5cf6",
    buttonText: "#ffffff",
    selectedItemBg: "#8b5cf6",
    selectedItemText: "#ffffff",
    cardShadow: "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)",
    hoverBg: "#262626",
    inputBg: "#1a1a1a",
    statusColors: {
      "To Do": "#f87171",
      "In Progress": "#fbbf24",
      Done: "#34d399",
    },
    error: {
      background: "#1f1415",
      color: "#fca5a5",
      border: "#3f1518",
    },
  },
};