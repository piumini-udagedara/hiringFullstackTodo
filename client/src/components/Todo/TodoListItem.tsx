import { useState } from "react";
import { Button } from "../button/button";
import { Delete, Edit, Save } from "lucide-react";
import type { TodoInterface } from "../../types/todo.type";
import { Input } from "../input/Input";
import { Textarea } from "../input/Textarea";

interface TodoListItemProps {
  todo: TodoInterface;
  toggleTodo: (value: { id: number; done: boolean }) => void;
  deleteTodo: (id: number) => void;
  editTodo: (value: {
    id: number;
    title: string;
    description?: string | null;
  }) => void;
}

export function TodoListItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description ?? "");

  const handleEdit = () => {
    if (isEditing) {
      if (!newTitle.trim()) {
        return;
      }
      editTodo({
        id: todo.id,
        title: newTitle.trim(),
        description: newDescription || null,
      });
      setIsEditing(false);
    } else {
      setNewTitle(todo.title);
      setNewDescription(todo.description ?? "");
      setIsEditing(true);
    }
  };

  return (
    <div
      className={`flex items-start justify-between p-4 border-b border-gray-200 `}
    >
      <div className="flex items-start gap-3 flex-grow">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo({ id: todo.id, done: !todo.done })}
          className="mt-1 h-5 w-5 rounded border border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={todo.done ? `Mark ${todo.title} as undone` : `Mark ${todo.title} as done`}
        />
        <div className="flex-grow">
          {isEditing ? (
            <Input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md bg-white text-gray-900 mb-1"
            />
          ) : (
            <h3
              className={`text-lg font-medium ${
                todo.done ? "line-through text-gray-500 " : "text-gray-900 "
              }`}
            >
              {todo.title}
            </h3>
          )}
          {isEditing ? (
            <Textarea
              value={newDescription ?? ""}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={2}
              className="w-full p-1 border border-gray-300  rounded-md bg-white  text-gray-700  text-sm"
            ></Textarea>
          ) : (
            todo.description && (
              <p
                className={`text-sm ${
                  todo.done ? "line-through text-gray-400 " : "text-gray-700"
                }`}
              >
                {todo.description}
              </p>
            )
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-end pl-4">
        {!todo.done && (
          <Button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            {isEditing ? "Save" : "Edit"}
          </Button>
        )}
        <Button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
        >
          <Delete className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
