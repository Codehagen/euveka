"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MeasurementCardProps {
  className?: string;
  icon?: ReactNode;
  title: string;
  value?: string | number;
  description?: string;
  status?: "in-progress" | "done" | "pending";
  date?: string;
  image?: string;
  onClick?: () => void;
}

export function MeasurementCard({
  className,
  icon,
  title,
  value,
  description,
  status,
  date,
  image,
  onClick,
}: MeasurementCardProps) {
  // Status colors
  const statusColors = {
    "in-progress": "bg-amber-500/80 text-amber-50",
    done: "bg-emerald-500/80 text-emerald-50",
    pending: "bg-slate-500/80 text-slate-50",
  };

  const statusLabels = {
    "in-progress": "IN PROGRESS",
    done: "DONE",
    pending: "PENDING",
  };

  return (
    <div
      className={cn(
        "group relative flex h-[220px] w-[280px] select-none flex-col justify-between overflow-hidden rounded-xl border-2 border-muted/80 bg-muted/70 p-4 backdrop-blur-sm transition-all duration-300 before:absolute before:inset-0 before:z-0 before:bg-background/50 before:transition-opacity before:duration-300 hover:border-white/20 hover:bg-muted/90 before:grayscale-[100%] hover:before:opacity-0 hover:before:grayscale-0",
        className
      )}
      onClick={onClick}
    >
      {/* Content wrapper - all elements inside need relative z-10 to appear above the filter overlay */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top section with icon and title */}
        <div className="flex items-start justify-between">
          {icon && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              {icon}
            </span>
          )}
          <div className="flex flex-col items-end">
            {value && (
              <span className="text-xl font-bold text-primary">{value}</span>
            )}
          </div>
        </div>

        {/* Middle content */}
        <div className="mt-2">
          <h3 className="text-lg font-medium text-primary">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Bottom section with status and date */}
        <div className="mt-auto flex items-center justify-between">
          {status && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                statusColors[status]
              )}
            >
              {statusLabels[status]}
            </span>
          )}
          {date && (
            <span className="text-sm text-muted-foreground">{date}</span>
          )}
        </div>
      </div>

      {/* Optional background image */}
      {image && (
        <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}

export function MeasurementCardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
