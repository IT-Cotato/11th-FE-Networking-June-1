import type { Theme } from "./theme";

export const darkTheme: Theme = {
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
};
