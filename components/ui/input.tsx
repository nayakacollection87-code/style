import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-border/50 bg-background/50 px-4 py-2 text-sm text-foreground transition-all duration-300",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/50 focus:border-[#00D4FF]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
