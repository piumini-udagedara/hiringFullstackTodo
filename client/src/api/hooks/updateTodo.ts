import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTodoI } from "../../types/todo.type";
import type { ApiError } from "../_types";
import { http } from "../_apiService";
import toast from "react-hot-toast";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, UpdateTodoI>({
    mutationFn: async (data) => {
      const response = await http.put<{ message: string }>(
        `/todos/${data.id}`,
        { title: data.title, description: data.description }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
      toast.error(error.msg || "Failed to update todo");
    },
  });
};
