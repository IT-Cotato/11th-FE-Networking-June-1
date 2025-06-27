import { useState, useEffect } from "react";
import type { User } from "../types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch((err) => setError(`사용자 로딩 실패: ${err.message}`))
      .finally(() => setIsLoading(false));
  }, []);

  return { users, isLoading, error };
}
