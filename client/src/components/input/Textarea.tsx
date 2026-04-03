import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function Textarea({ className = "", error, ...props }: TextareaProps) {
  const baseClasses =
    "w-full p-2 border rounded-md text-gray-900  focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-y";
  const errorClasses = error
    ? "border-red-500  focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500";

  return (
    <div className="mb-4">
      <textarea
        className={`${baseClasses} ${errorClasses} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${props.id || "textarea"}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${props.id || "textarea"}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
