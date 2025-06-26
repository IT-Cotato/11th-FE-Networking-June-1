// src/stores/useUserStore.ts
import { create } from "zustand";
import type { User } from "../types/types";

type State = {
  users: User[];
  defaultAssignee: string;
};

type Actions = {
  setUsers: (users: User[]) => void;
  setDefaultAssignee: (id: string) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  users: [],
  defaultAssignee: "",
  setUsers: (users) => set({ users }),
  setDefaultAssignee: (id) => set({ defaultAssignee: id }),
}));
