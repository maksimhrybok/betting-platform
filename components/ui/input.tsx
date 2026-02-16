import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm",
            "placeholder:text-slate-400 text-white bg-slate-900",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "hover:border-slate-300",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
