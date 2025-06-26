import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, Status } from "@/types/task";
import {
  handleGetTasks,
  handleAddTask,
  handleStatusChange,
} from "@/services/taskService";

export const useTasks = (projectId: number | null) => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: () => handleGetTasks(projectId!),
    enabled: !!projectId,
    staleTime: 30 * 1000,
  });

  const addTask = useMutation({
    mutationFn: handleAddTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: Status;
    }) => handleStatusChange(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    error,
    addTask: addTask.mutate,
    updateTask: updateTask.mutate,
  };
};