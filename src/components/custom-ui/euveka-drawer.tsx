"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EuvekaDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  withOverlay?: boolean;
  title?: string;
  footer?: React.ReactNode;
}

export const EuvekaDrawer = ({
  children,
  isOpen,
  onClose,
  position = "right",
  size = "md",
  className,
  overlayClassName,
  showCloseButton = true,
  closeOnOverlayClick = true,
  withOverlay = true,
  title,
  footer,
}: EuvekaDrawerProps) => {
  // Trap focus inside drawer when open
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Handle ESC key to close drawer
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Size mapping - width for left/right, height for top/bottom
  const sizeMap = {
    sm: position === "left" || position === "right" ? "w-64" : "h-64",
    md: position === "left" || position === "right" ? "w-80" : "h-80",
    lg: position === "left" || position === "right" ? "w-96" : "h-96",
    xl: position === "left" || position === "right" ? "w-[32rem]" : "h-[32rem]",
    full: position === "left" || position === "right" ? "w-full" : "h-full",
  };

  // Position transforms for entry/exit animations
  const positionStyles = {
    left: {
      drawer: "top-0 left-0 h-full",
      transform: isOpen ? "translate-x-0" : "-translate-x-full",
    },
    right: {
      drawer: "top-0 right-0 h-full",
      transform: isOpen ? "translate-x-0" : "translate-x-full",
    },
    top: {
      drawer: "top-0 left-0 w-full",
      transform: isOpen ? "translate-y-0" : "-translate-y-full",
    },
    bottom: {
      drawer: "bottom-0 left-0 w-full",
      transform: isOpen ? "translate-y-0" : "translate-y-full",
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop/Overlay */}
      {withOverlay && (
        <div
          className={cn(
            "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            isOpen ? "opacity-100" : "opacity-0",
            overlayClassName
          )}
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-background/90 backdrop-blur-md border border-border shadow-lg",
          sizeMap[size],
          positionStyles[position].drawer,
          "transition-transform duration-300 ease-in-out",
          className
        )}
        style={{ transform: positionStyles[position].transform }}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && (
              <h2 className="text-lg font-medium text-foreground">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-muted/80 transition-colors"
                aria-label="Close drawer"
              >
                <X className="size-5 text-foreground/70" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 border-t border-border mt-auto">{footer}</div>
        )}
      </div>
    </div>
  );
};

// Convenience component for triggering drawer
interface EuvekaDrawerTriggerProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const EuvekaDrawerTrigger = ({
  children,
  onClick,
  className,
}: EuvekaDrawerTriggerProps) => {
  return (
    <div onClick={onClick} className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
};
