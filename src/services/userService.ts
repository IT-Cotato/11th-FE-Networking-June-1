import { apiClient } from "./apiClient";
import type { User } from "@/types/user";
import { getErrorMessage } from "@/utils/errorHandler";

export const handleGetUsers = async (): Promise<User[]> => {
  try {
    const res = await apiClient.get<User[]>("/users");
    return res.data;
  } catch(err) {
    throw new Error(getErrorMessage(err, "사용자 로딩"));
  }
};