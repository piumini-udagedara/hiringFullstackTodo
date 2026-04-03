import { useState } from "react";
import { Button } from "../button/button";
import { Delete, Edit, Save } from "lucide-react";
import type { TodoInterface } from "../../types/todo.type";
import { Input } from "../input/Input";
import { Textarea } from "../input/Textarea";

interface TodoListItemProps {
  todo: TodoInterface;
  toggleTodo: (value: { id: number; stuts: boolean }) => void;
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
      if (newTitle.trim()) {
        editTodo({
          id: todo.id,
          title: newTitle.trim(),
          description: newDescription || null,
        });
        setIsEditing(false);
      } else {
        // Revert to original values if new title is empty
        setNewTitle(todo.title);
        setNewDescription(todo.description ?? "");
        setIsEditing(false);
      }
    } else {
      // Reset to current todo values when entering edit mode
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
          onChange={() => toggleTodo({ id: todo.id, stuts: !todo.done })}
          className="mt-1 form-checkbox h-5 w-5 text-blue-600 rounded "
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
      {todo.done ? null : (
        <div className="flex-shrink-0 flex gap-2 ml-4">
          <Button
            onClick={handleEdit}
            className="p-2 rounded-md text-sm font-medium transition-colors
            bg-blue-500 text-white hover:bg-blue-600
            dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {isEditing ? (
              <Save className="h-5 w-5" />
            ) : (
              <Edit className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 rounded-md text-sm font-medium transition-colors
            bg-red-500 text-white hover:bg-red-600
            dark:bg-red-700 dark:hover:bg-red-600"
          >
            <Delete className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
