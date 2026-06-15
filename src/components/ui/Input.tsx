import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="text-sm text-slate-500 font-bold block mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full p-4 bg-[#141f38] rounded-lg border border-transparent focus:border-indigo-500 outline-none text-white ${className}`}
        {...props}
      />
    </div>
  );
}
