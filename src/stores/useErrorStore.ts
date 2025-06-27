import { create } from "zustand";

interface ErrorStore {
  error: string | null;
  setError: (message: string) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (message) => set({ error: message }),
}));