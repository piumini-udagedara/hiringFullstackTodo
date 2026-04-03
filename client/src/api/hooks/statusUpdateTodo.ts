import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { StatusUpdateTodoI } from "../../types/todo.type";
import type { ApiError } from "../_types";
import { http } from "../_apiService";
import { toast } from "react-hot-toast";

export const useStatusUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, StatusUpdateTodoI>({
    mutationFn: async (data) => {
      const response = await http.patch<{ message: string }>(
        `/todos/${data.id}/status`,
        { done: data.done }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(
        variables.done ? "Todo marked as done!" : "Todo marked as undone!"
      );
    },
    onError: (error) => {
      console.error("Error updating todo status:", error);
      toast.error(error.msg || "Failed to update todo status");
    },
  });
};
