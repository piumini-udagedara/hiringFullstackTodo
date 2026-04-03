import { useQuery } from "@tanstack/react-query";
import type { TodoInterface } from "../../types/todo.type";
import type { ApiError } from "../_types";
import { http } from "../_apiService";

export const useGetTodos = () => {
  return useQuery<TodoInterface[], ApiError>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await http.get<TodoInterface[]>("/todos");
      return Array.isArray(response.data) ? response.data : [];
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
