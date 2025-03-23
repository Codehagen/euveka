"use client";

import { cn } from "@/lib/utils";
import React, {
  ReactNode,
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Context for dialog state management
interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}

// Export hook for external use
export const useEuvekaDialog = () => {
  const context = useDialog();

  // Enhanced with utility functions
  return {
    ...context,
    close: () => context.setIsOpen(false),
    open: () => context.setIsOpen(true),
    toggle: () => context.setIsOpen(!context.isOpen),
  };
};

interface DialogProps {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EuvekaDialog({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DialogProps) {
  // Handle controlled/uncontrolled state
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export function EuvekaDialogTrigger({
  children,
  asChild = false,
  className,
}: DialogTriggerProps) {
  const { setIsOpen } = useDialog();

  const handleClick = () => {
    setIsOpen(true);
  };

  if (asChild) {
    // Clone the child element with additional props
    const child = children as React.ReactElement;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        handleClick();
      },
    });
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export function EuvekaDialogClose({ className }: { className?: string }) {
  const { close } = useEuvekaDialog();

  return (
    <button
      type="button"
      className={cn(
        "absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground",
        "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
        "transition-colors duration-200",
        className
      )}
      onClick={close}
      aria-label="Close"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function EuvekaDialogContent({
  children,
  className,
  overlayClassName,
}: DialogContentProps) {
  const { isOpen, setIsOpen } = useDialog();
  const [isMounted, setIsMounted] = useState(false);

  // Handle escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, setIsOpen]);

  // Handle portal mounting
  useEffect(() => {
    setIsMounted(true);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop/overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm",
          "animate-in fade-in duration-200 ease-out",
          overlayClassName
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
          "animate-in slide-in-from-bottom-4 fade-in duration-300 ease-out",
          "focus:outline-none"
        )}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div
          className={cn(
            "min-w-[20rem] max-h-[85vh] overflow-auto rounded-xl",
            "border border-muted/30 bg-background/80 backdrop-blur-lg shadow-lg",
            "p-6 relative",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function EuvekaDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />
  );
}

export function EuvekaDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-end gap-2 mt-6", className)} {...props} />
  );
}

export function EuvekaDialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-xl font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function EuvekaDialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}
