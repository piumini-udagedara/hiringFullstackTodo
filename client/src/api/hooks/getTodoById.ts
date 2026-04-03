import { useQuery } from "@tanstack/react-query";
import type { TodoInterface } from "../../types/todo.type";
import type { ApiError } from "../_types";
import { http } from "../_apiService";

export const useGetTodoById = (id: number) => {
  return useQuery<TodoInterface, ApiError>({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await http.get<TodoInterface>(`/todos/${id}`);
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 0,
    enabled: !!id,
  });
};
