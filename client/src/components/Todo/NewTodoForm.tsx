import { useState } from "react";
import { Input } from "../input/Input";
import { Textarea } from "../input/Textarea";
import { Button } from "../button/button";
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

  const titleError = validateTitle(title);
  const descriptionError = validateDescription(description);
  const isSubmitDisabled = !!titleError || !!descriptionError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ title: true, description: true });
    setErrors({ title: titleError, description: descriptionError });

    if (isSubmitDisabled) {
      return;
    }

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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Todo</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          id="todo-title"
          type="text"
          placeholder="Enter a short title for your todo"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          error={touched.title ? errors.title : undefined}
          aria-required="true"
        />
        <Textarea
          id="todo-description"
          placeholder="Add an optional description for more context"
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
          error={touched.description ? errors.description : undefined}
        />
        <Button type="submit" disabled={isSubmitDisabled}>
          Add Todo
        </Button>
      </form>
    </div>
  );
}
