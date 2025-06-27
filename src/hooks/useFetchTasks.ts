import { useEffect } from "react";
import { useProjectStore } from "../stores/useProjectStore";
import { useTaskStore } from "../stores/useTaskStore";

/** 할 일 목록 가져오기 */

export const useFetchTasks = () => {
  const { selectedProjectId } = useProjectStore();
  const { setIsLoadingTask, setTasks, setTaskError } = useTaskStore();

  useEffect(() => {
    if (selectedProjectId === null) return;
    setIsLoadingTask(true);

    fetch(`/api/tasks?projectId=${selectedProjectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok ");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setTaskError(`할 일 로딩 실패: ${err.message}`))
      .finally(() => setIsLoadingTask(false));
  }, [selectedProjectId, setTasks, setIsLoadingTask, setTaskError]);
};
