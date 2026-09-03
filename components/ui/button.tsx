"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-hanken uppercase tracking-[0.16em] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-sm",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-accent to-text/70 text-primary-bg hover:bg-accent hover:text-primary-bg border border-text hover:border-accent shadow-sm",
        secondary:
          "bg-primary-bg text-text border border-border hover:border-accent hover:bg-accent hover:text-primary-bg shadow-sm",
        outline:
          "border border-text text-text hover:bg-accent hover:border-accent hover:text-primary-bg",
        gradient:
          "heaven-button bg-accent text-primary-bg hover:animate-none hover:text-primary-bg shadow-sm rounded-xs",
        textGradient:
          "bg-clip-text text-transparent bg-linear-to-b from-accent to-text/70 hover:text-accent shadow-none rounded-xs",
        ghost: "text-text hover:bg-border/30 hover:text-accent",
        link: "text-text hover:text-accent underline-offset-4 hover:underline border-none shadow-none p-0 uppercase tracking-[0.2em] font-bold",
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
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    // ──────────────────────────────────────────────────────────────
    // asChild is already destructured, so it's NOT in ...props
    // This prevents the React warning about unrecognized DOM prop.
    // ──────────────────────────────────────────────────────────────

    const Comp = asChild ? Slot : "button";

    // ──────────────────────────────────────────────────────────────
    // Guard: asChild requires exactly one child
    // ──────────────────────────────────────────────────────────────
    if (asChild) {
      const childCount = React.Children.count(children);
      if (childCount !== 1) {
        console.warn(
          "[Button] `asChild` prop requires exactly one child element. " +
            `${childCount} children provided. Falling back to regular button.`,
        );
        // Fallback: render as regular button
        return (
          <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            {children}
          </button>
        );
      }
    }

    // ──────────────────────────────────────────────────────────────
    // Render: Slot (asChild) or regular button
    // ──────────────────────────────────────────────────────────────
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
