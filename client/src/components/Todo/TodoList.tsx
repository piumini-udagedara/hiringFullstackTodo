import { TodoListItem } from "./TodoListItem";
import type { TodoInterface } from "../../types/todo.type";

interface TodoListProps {
  todos: TodoInterface[] | [];
  toggleTodo: (value: { id: number; stuts: boolean }) => void;
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
    <div className=" bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-bold ">My Todos</h2>
      <div className="bg-white p-4">
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={(e) => {
              editTodo(e);
            }}
          />
        ))}
      </div>
    </div>
  );
}
