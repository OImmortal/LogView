import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
}

const variantClasses = {
  primary: "bg-primary text-on-primary hover:bg-primary-dim",
  secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container",
  danger: "bg-error-container text-white hover:bg-error-dim",
};

const sizeClasses = {
  sm: "px-3 py-1 text-xs",
  md: "px-6 py-2 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-lg font-bold transition-all disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
