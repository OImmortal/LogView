import React from "react";

interface CardProps {
  title: string;
  variant?: "error" | "warning" | "info" | "default";
  compact?: boolean;
  children?: React.ReactNode;
}

const borderClasses = {
  error: "border-l-4 border-error",
  warning: "border-l-4 border-tertiary",
  info: "border-l-4 border-primary",
  default: "border border-outline-variant",
};

export default function Card({
  title,
  variant = "default",
  compact = false,
  children,
}: CardProps) {
  return (
    <div
      className={`bg-surface-container-low rounded-xl ${borderClasses[variant]} ${compact ? "p-4" : "p-6"}`}
    >
      <p className={`font-bold text-on-surface ${compact ? "text-sm" : "text-lg"}`}>
        {title}
      </p>
      {children}
    </div>
  );
}
