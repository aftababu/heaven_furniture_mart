import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-hanken uppercase tracking-[0.16em] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-sm",
  {
    variants: {
      variant: {
        default:
          "bg-charcoal text-ivory hover:bg-brass hover:text-ivory border border-charcoal hover:border-brass shadow-sm",
        secondary:
          "bg-white text-charcoal border border-wood-border hover:border-brass hover:bg-brass hover:text-white shadow-sm",
        outline:
          "border border-charcoal text-charcoal hover:bg-brass hover:border-brass hover:text-white",
        brass:
          "bg-brass text-ivory hover:bg-charcoal hover:text-ivory border border-brass hover:border-charcoal shadow-sm",
        ghost:
          "text-charcoal hover:bg-wood-border/30 hover:text-brass",
        link:
          "text-charcoal hover:text-brass underline-offset-4 hover:underline border-none shadow-none p-0 uppercase tracking-[0.2em] font-bold",
      },
      size: {
        default: "px-5 py-2.5 text-xs",
        sm: "px-3.5 py-1.5 text-[0.68rem]",
        lg: "px-7 py-3.5 text-xs sm:text-sm",
        icon: "h-9 w-9 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
