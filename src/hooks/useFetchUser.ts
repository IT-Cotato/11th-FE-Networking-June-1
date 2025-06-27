import { useEffect } from "react";

import { useUserStore } from "../stores/useUserStore";
import { useTaskStore } from "../stores/useTaskStore";

/** 유저 목록 가져오기 */

export const useFetchUser = () => {
  const { setUsers, setIsLoadingUser, setUserError } = useUserStore();
  const { setNewTaskAssignee } = useTaskStore();

  useEffect(() => {
    setIsLoadingUser(true);
    fetch("/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setNewTaskAssignee((prev) =>
            prev === "" ? String(data[0].id) : prev
          );
        }
      })
      .catch((err: Error) => setUserError(`사용자 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingUser(false));
  }, [setUsers, setNewTaskAssignee, setIsLoadingUser, setUserError]);
};
