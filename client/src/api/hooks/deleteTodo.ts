import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ApiError } from "../_types";
import { http } from "../_apiService";
import toast from "react-hot-toast";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, ApiError, { id: number }>({
    mutationFn: async (data) => {
      const response = await http.delete<{ message: string }>(
        `/todos/${data.id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
      toast.error(error.msg || "Failed to delete todo");
    },
  });
};
