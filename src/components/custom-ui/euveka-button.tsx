"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface EuvekaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export function EuvekaButton({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: EuvekaButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-primary/80 text-primary-foreground border-primary/20 hover:bg-primary/90 shadow-sm",
    secondary:
      "bg-secondary/80 text-secondary-foreground border-secondary/20 hover:bg-secondary/90 shadow-sm",
    outline: "bg-transparent border-muted hover:bg-muted/40 text-foreground",
    ghost: "bg-transparent hover:bg-muted/40 text-foreground",
  };

  // Base classes for the button
  const baseClasses = cn(
    "relative inline-flex items-center justify-center rounded-xl border transition-colors duration-300",
    "font-medium",
    "backdrop-blur-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <button className={baseClasses} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        </span>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className={cn("mr-2", size === "sm" ? "text-xs" : "text-sm")}>
              {icon}
            </span>
          )}
          <span className={cn(isLoading && "opacity-0")}>{children}</span>
          {icon && iconPosition === "right" && (
            <span className={cn("ml-2", size === "sm" ? "text-xs" : "text-sm")}>
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
