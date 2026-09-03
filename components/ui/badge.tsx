import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 font-hanken text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-text text-primary-bg hover:bg-accent",
        secondary:
          "border-transparent bg-secondary-bg text-text hover:bg-border",
        destructive:
          "border-transparent bg-text text-primary-bg hover:bg-text-muted",
        outline: "text-text border border-border hover:bg-secondary-bg",
        brass: "border-transparent bg-accent text-primary-bg hover:bg-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
