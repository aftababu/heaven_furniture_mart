"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ──────────────────────────────────────────────────────────────
// DIALOG OVERLAY — with asChild support for Framer Motion
// ──────────────────────────────────────────────────────────────

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> {
  asChild?: boolean;
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : DialogPrimitive.Overlay;
  const baseClassName = cn(
    "fixed inset-0 z-[999] bg-accent/5 backdrop-blur-md data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide",
    className,
  );

  // If asChild is true, we need to render the child with the className
  // and ref passed through via React.cloneElement.
  if (asChild) {
    const child = React.Children.only(props.children) as React.ReactElement<{
      className?: string;
    }>;
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={baseClassName}
        {...props}
        asChild={true}
      >
        {React.cloneElement(child, {
          className: cn(child.props.className, baseClassName),
        })}
      </DialogPrimitive.Overlay>
    );
  }

  return (
    <DialogPrimitive.Overlay ref={ref} className={baseClassName} {...props} />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ──────────────────────────────────────────────────────────────
// DIALOG CONTENT — with asChild support for Framer Motion
// ──────────────────────────────────────────────────────────────

interface DialogContentProps extends React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  asChild?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, asChild, ...props }, ref) => {
  const baseClassName = cn(
    "fixed left-[50%] top-[50%] z-[1000] grid w-[calc(100vw-2rem)] max-w-xl max-h-[88vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 bg-primary-bg border border-border p-6 sm:p-10 shadow-2xl rounded-xl data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide",
    className,
  );

  // If asChild is true, render the child with merged props and className
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string;
    }>;
    return (
      <DialogPortal>
        <DialogOverlay asChild>
          <div className="fixed inset-0" />
        </DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={baseClassName}
          {...props}
          asChild={true}
        >
          {React.cloneElement(child, {
            className: cn(child.props.className, baseClassName),
          })}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }

  // Regular rendering
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content ref={ref} className={baseClassName} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-6 top-6 rounded-sm text-text hover:bg-text/10 p-1.5 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-accent group">
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 text-text" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

// ──────────────────────────────────────────────────────────────
// DIALOG HEADER
// ──────────────────────────────────────────────────────────────

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-left mb-4", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

// ──────────────────────────────────────────────────────────────
// DIALOG TITLE
// ──────────────────────────────────────────────────────────────

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "font-sangbleu-sunrise font-light text-3xl sm:text-4xl text-text leading-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// ──────────────────────────────────────────────────────────────
// DIALOG DESCRIPTION
// ──────────────────────────────────────────────────────────────

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "font-hanken text-xs sm:text-sm text-text-muted font-medium mt-1",
      className,
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// ──────────────────────────────────────────────────────────────
// EXPORTS
// ──────────────────────────────────────────────────────────────

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
};
