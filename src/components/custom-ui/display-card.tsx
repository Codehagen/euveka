"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DisplayCardProps {
  icon?: React.ReactNode;
  iconColor?: string;
  title?: string;
  titleColor?: string;
  description?: string;
  date?: string;
  className?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  grayscale?: boolean;
}

export function DisplayCard({
  icon,
  iconColor = "bg-primary",
  title,
  titleColor = "text-primary",
  description,
  date,
  className,
  onClick,
  footer,
  children,
  width = "w-[22rem]",
  height = "h-36",
  grayscale = true,
}: DisplayCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col justify-between p-4 rounded-xl border-2 border-border",
        "bg-muted/70 hover:bg-muted backdrop-blur-sm shadow-sm",
        "transition-all duration-700",
        grayscale && "grayscale-[100%] hover:grayscale-0",
        onClick && "cursor-pointer",
        width,
        height,
        className
      )}
    >
      {/* Main content */}
      <div className="space-y-2">
        {/* Icon */}
        {icon && (
          <div className={cn("rounded-full p-1.5 w-fit", iconColor)}>
            <div className="text-white">{icon}</div>
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className={cn("text-lg font-medium mt-2", titleColor)}>
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-foreground/80">{description}</p>
        )}

        {/* Custom children content */}
        {children}
      </div>

      {/* Date or footer */}
      <div className="mt-auto pt-2">
        {footer
          ? footer
          : date && <p className="text-xs text-muted-foreground">{date}</p>}
      </div>
    </div>
  );
}
