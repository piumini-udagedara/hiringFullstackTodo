import { TodoListItem } from "./TodoListItem";
import type { TodoInterface } from "../../types/todo.type";

interface TodoListProps {
  todos: TodoInterface[] | [];
  toggleTodo: (value: { id: number; done: boolean }) => void;
  deleteTodo: (id: number) => void;
  editTodo: (value: {
    id: number;
    title: string;
    description?: string | null;
  }) => void;
}

export function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Todos</h2>
          <p className="text-sm text-gray-500">
            {todos.length === 0
              ? "No tasks yet. Add one to get started."
              : `${todos.length} task${todos.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3 bg-white">
        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-600">
            You don’t have any todos yet. Use the form to add a new task.
          </div>
        ) : (
          todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
