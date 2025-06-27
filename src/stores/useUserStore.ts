import { create } from "zustand";
import type { User } from "../types";

interface UserStore {
  users: User[];
  isLoadingUser: boolean;
  userError: string | null;

  setUsers: (users: User[]) => void;
  setIsLoadingUser: (value: boolean) => void;
  setUserError: (value: string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  isLoadingUser: false,
  userError: null,

  setUsers: (users) => set({ users }),
  setIsLoadingUser: (value) => set({ isLoadingUser: value }),
  setUserError: (userError) => set({ userError }),
}));
