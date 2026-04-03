import { useState } from "react";
import { Input } from "../input/Input";
import { Textarea } from "../input/Textarea";
import type { CreateTodoI } from "../../types/todo.type";

interface NewTodoFormProps {
  addTodo: (value: CreateTodoI) => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export function NewTodoForm({ addTodo }: NewTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{
    title: boolean;
    description: boolean;
  }>({
    title: false,
    description: false,
  });

  const validateTitle = (value: string): string | undefined => {
    if (!value.trim()) {
      return "Title is required";
    }
    if (value.trim().length < 3) {
      return "Title must be at least 3 characters long";
    }
    if (value.trim().length > 100) {
      return "Title must be less than 100 characters";
    }
    return undefined;
  };

  const validateDescription = (value: string): string | undefined => {
    if (value.length > 500) {
      return "Description must be less than 500 characters";
    }
    return undefined;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (touched.title) {
      setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);
    if (touched.description) {
      setErrors((prev) => ({
        ...prev,
        description: validateDescription(value),
      }));
    }
  };

  const handleTitleBlur = () => {
    setTouched((prev) => ({ ...prev, title: true }));
    setErrors((prev) => ({ ...prev, title: validateTitle(title) }));
  };

  const handleDescriptionBlur = () => {
    setTouched((prev) => ({ ...prev, description: true }));
    setErrors((prev) => ({
      ...prev,
      description: validateDescription(description),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ title: true, description: true });

    // Validate all fields
    const titleError = validateTitle(title);
    const descriptionError = validateDescription(description);

    if (titleError || descriptionError) {
      setErrors({
        title: titleError,
        description: descriptionError,
      });
      return;
    }

    // If validation passes, submit the form
    addTodo({
      title: title.trim(),
      description: description.trim() ? description.trim() : undefined,
    });
    setTitle("");
    setDescription("");
    setErrors({});
    setTouched({ title: false, description: false });
  };

  return (
    <div className=" bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Todo</h2>
      <form className="flex flex-col " onSubmit={handleSubmit} noValidate>
        <Input
          id="todo-title"
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          error={errors.title}
          aria-required="true"
        />
        <Textarea
          id="todo-description"
          placeholder="Todo description (optional)"
          rows={3}
          value={description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!!errors.title}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}
