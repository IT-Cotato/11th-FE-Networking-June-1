export interface Theme {
  background: string;
  text: string;
  componentBg: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  selectedItemBg: string;
  selectedItemText: string;
  cardShadow: string;
  hoverBg: string;
  inputBg: string;
  statusColors: {
    "To Do": string;
    "In Progress": string;
    Done: string;
  };
  error: {
    background: string;
    color: string;
    border: string;
  };
}

export type ThemeName = "light" | "dark";