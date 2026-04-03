/* eslint-disable react-hooks/exhaustive-deps */
import { NewTodoForm } from "./components/Todo/NewTodoForm";
import { TodoList } from "./components/Todo/TodoList";
import { Header } from "./components/layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { CreateTodoI } from "./types/todo.type";
import { useAddTodo } from "./api/hooks/createTodo";
import { useGetTodos } from "./api/hooks/getTodos";
import { useEffect } from "react";
import { useDeleteTodo } from "./api/hooks/deleteTodo";
import { useUpdateTodo } from "./api/hooks/updateTodo";
import { useStatusUpdateTodo } from "./api/hooks/statusUpdateTodo";
import { Toaster } from "react-hot-toast";

// Create QueryClient outside component to avoid recreating on every render
const queryClient = new QueryClient();

function TodoAppContent() {
  const { mutate, data: dataTodo, error: errorMutate } = useAddTodo();
  const { data, isLoading, error, refetch } = useGetTodos();

  const {
    mutate: deleteTodo,
    data: deleteTodoData,
    error: errorDelete,
  } = useDeleteTodo();

  const {
    mutate: updateTodo,
    data: updateTodoData,
    error: errorUpdate,
  } = useUpdateTodo();

  const {
    mutate: statusUpdateTodo,
    data: statusUpdateTodoData,
    error: errorStatusUpdate,
  } = useStatusUpdateTodo();

  useEffect(() => {
    if (!errorUpdate && updateTodoData) {
      refetch();
    }
  }, [updateTodoData, errorUpdate]);

  useEffect(() => {
    if (!errorStatusUpdate && statusUpdateTodoData) {
      refetch();
    }
  }, [errorStatusUpdate, statusUpdateTodoData]);
  useEffect(() => {
    if (!errorMutate && dataTodo) {
      refetch();
    }
  }, [errorMutate, dataTodo]);

  useEffect(() => {
    if (!errorDelete && deleteTodoData) {
      refetch();
    }
  }, [deleteTodoData, errorDelete]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading todos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading todos: {error.msg || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className=" mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NewTodoForm addTodo={(v: CreateTodoI) => mutate(v)} />
          </div>
          <div className="lg:col-span-2">
            <TodoList
              todos={data || []}
              toggleTodo={(e) => {
                statusUpdateTodo({ id: e.id, done: e.stuts });
              }}
              deleteTodo={(id) => {
                deleteTodo({ id: id });
              }}
              editTodo={(e) => {
                updateTodo(e);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <TodoAppContent />
    </QueryClientProvider>
  );
}
export default App;
