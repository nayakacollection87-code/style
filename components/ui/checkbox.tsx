"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md border border-[#00D4FF]/50 bg-background/50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/50",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00D4FF] data-[state=checked]:to-[#A855F7]",
      "data-[state=checked]:border-transparent transition-all duration-300",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-white")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
