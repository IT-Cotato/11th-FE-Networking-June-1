import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
}

export const useUsers = (onFirstUserId?: (id: string) => void) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingUsers(true);
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
        if (data.length > 0 && onFirstUserId) {
          onFirstUserId(String(data[0].id));
        }
      })
      .catch((err: Error) => setError(`사용자 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingUsers(false));
  }, [onFirstUserId]);

  return {
    users,
    isLoadingUsers,
    userError: error,
  };
};
