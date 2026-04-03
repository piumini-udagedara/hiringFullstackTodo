import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    // Variant styles
    const variantClasses =
      variant === "default"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : variant === "destructive"
        ? "bg-red-600 text-white hover:bg-red-700"
        : variant === "outline"
        ? "border border-gray-300 bg-white hover:bg-gray-100"
        : variant === "secondary"
        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
        : variant === "ghost"
        ? "bg-transparent hover:bg-gray-100"
        : variant === "link"
        ? "text-blue-600 underline-offset-4 hover:underline"
        : "";

    // Size styles
    const sizeClasses =
      size === "default"
        ? "h-10 px-4 py-2"
        : size === "sm"
        ? "h-9 rounded-md px-3"
        : size === "lg"
        ? "h-11 rounded-md px-8"
        : size === "icon"
        ? "h-10 w-10 p-0 flex items-center justify-center"
        : "";

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
