// src/hooks/useUsers.ts
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore"; // zustand store
import type { User } from "../types/types";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const setDefaultAssignee = useUserStore((state) => state.setDefaultAssignee);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("유저 로딩 실패");
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);

        if (data.length > 0) {
          setDefaultAssignee(String(data[0].id));
        }
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users, isLoading, error };
};
