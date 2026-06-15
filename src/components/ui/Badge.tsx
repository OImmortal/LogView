import React from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
}

const variantClasses = {
  success: "bg-secondary/20 text-secondary border-secondary/40",
  warning: "bg-tertiary/20 text-tertiary border-tertiary/40",
  error: "bg-error/20 text-error border-error/40",
  info: "bg-primary/20 text-primary border-primary/40",
};

export default function Badge({ variant = "info", children }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
