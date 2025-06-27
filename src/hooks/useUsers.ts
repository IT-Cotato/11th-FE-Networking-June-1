import { useEffect, useState } from 'react';

export interface User {
  id: number;
  name: string;
}

export const useUsers = (setError: (msg: string) => void) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setUsers)
      .catch(() => setError('사용자 로딩 실패'))
      .finally(() => setLoading(false));
  }, [setError]);

  return { users, loading };
};
