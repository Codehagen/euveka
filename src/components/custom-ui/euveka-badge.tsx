"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps {
  children?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";
  size?: "sm" | "md" | "lg";
  count?: number;
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  pulsating?: boolean;
  className?: string;
}

export function EuvekaBadge({
  children,
  variant = "primary",
  size = "md",
  count,
  max = 99,
  showZero = false,
  dot = false,
  pulsating = false,
  className,
}: BadgeProps) {
  // Variant styles
  const variantStyles = {
    primary: "bg-primary/80 text-primary-foreground border-primary/20",
    secondary: "bg-secondary/80 text-secondary-foreground border-secondary/20",
    success: "bg-emerald-500/80 text-emerald-50 border-emerald-500/20",
    warning: "bg-amber-500/80 text-amber-50 border-amber-500/20",
    danger: "bg-rose-500/80 text-rose-50 border-rose-500/20",
    neutral: "bg-muted/80 text-muted-foreground border-muted/20",
  };

  // Size styles
  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5 min-w-5 min-h-5",
    md: "text-xs px-2 py-1 min-w-6 min-h-6",
    lg: "text-sm px-2.5 py-1 min-w-7 min-h-7",
  };

  // Dot styles
  const dotSizeStyles = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  };

  // Badge content
  const renderContent = () => {
    if (dot) {
      return (
        <span
          className={cn(
            "inline-block rounded-full",
            dotSizeStyles[size],
            pulsating && "animate-pulse"
          )}
        />
      );
    }

    if (typeof count !== "undefined") {
      // Don't show if count is 0 and showZero is false
      if (count === 0 && !showZero) {
        return null;
      }

      const displayCount = count > max ? `${max}+` : count;
      return displayCount;
    }

    return children;
  };

  const content = renderContent();

  // Don't render if no content
  if (content === null) {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full backdrop-blur-sm",
        "border shadow-sm",
        variantStyles[variant],
        !dot && sizeStyles[size],
        className
      )}
    >
      {content}
    </div>
  );
}

interface BadgeWithCounterProps extends Omit<BadgeProps, "children" | "count"> {
  label: React.ReactNode;
  count: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function EuvekaBadgeWithCounter({
  label,
  count,
  position = "top-right",
  ...badgeProps
}: BadgeWithCounterProps) {
  // Position styles
  const positionStyles = {
    "top-right": "-top-1 -right-1",
    "top-left": "-top-1 -left-1",
    "bottom-right": "-bottom-1 -right-1",
    "bottom-left": "-bottom-1 -left-1",
  };

  return (
    <div className="relative inline-flex">
      {label}
      <div className={cn("absolute", positionStyles[position])}>
        <EuvekaBadge count={count} size="sm" {...badgeProps} />
      </div>
    </div>
  );
}
