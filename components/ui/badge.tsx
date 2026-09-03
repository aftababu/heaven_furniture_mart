import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 font-hanken text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-charcoal text-ivory hover:bg-brass",
        secondary:
          "border-transparent bg-sand text-charcoal hover:bg-wood-border",
        destructive:
          "border-transparent bg-red-900 text-white hover:bg-red-800",
        outline: "text-charcoal border border-wood-border hover:bg-sand",
        brass: "border-transparent bg-brass text-ivory hover:bg-brass-gold",
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
