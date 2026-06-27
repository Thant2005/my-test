import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTask,
  deleteTask,
  getTasks,
  toggleTask,
} from "../services/taskService";

const TASK_KEY: string[] = ["tasks"];
const useTasks = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: TASK_KEY,
    queryFn: () => getTasks("tasks"),
  });

  return { data, error, isLoading };
};

const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) =>
      addTask("tasks", { title, is_completed: false }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASK_KEY }),
  });
};
const useToggleTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      currentStatus,
    }: {
      id: string;
      currentStatus: boolean;
    }) => toggleTask("tasks", id, currentStatus),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASK_KEY }),
  });
};
const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask("tasks", id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASK_KEY }),
  });
};
export { useTasks, useAddTask, useToggleTask, useDeleteTask };
