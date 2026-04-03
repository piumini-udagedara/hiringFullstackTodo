import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateTodoI } from "../../types/todo.type";
import type { ApiError } from "../_types";
import { http } from "../_apiService";
import toast from "react-hot-toast";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, CreateTodoI>({
    mutationFn: async (data) => {
      const response = await http.post<{ message: string }>("/todos", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully!");
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
      toast.error(error.msg || "Failed to create todo");
    },
  });
};
