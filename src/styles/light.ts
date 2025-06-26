import type { Theme } from "./theme";

export const lightTheme: Theme = {
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
};
