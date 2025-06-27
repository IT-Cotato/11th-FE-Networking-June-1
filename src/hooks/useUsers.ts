import { useQuery } from "@tanstack/react-query";
import { handleGetUsers } from "@/services/userService";
import type { User } from "@/types/user";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: handleGetUsers,
    staleTime: 5 * 60 * 1000,
  });