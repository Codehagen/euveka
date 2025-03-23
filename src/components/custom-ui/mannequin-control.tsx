"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

interface MannequinControlProps {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  sectionName?: string;
  icon?: React.ReactNode;
  onChange?: (value: number) => void;
  className?: string;
}

export function MannequinControl({
  label,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  unit = "CM",
  sectionName = "Measurements",
  icon,
  onChange,
  className,
}: MannequinControlProps) {
  const [value, setValue] = useState(defaultValue);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-muted/30 bg-background/60 p-6 backdrop-blur-md shadow-sm",
        className
      )}
    >
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        {sectionName}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-medium text-foreground">{label}</h3>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDecrement}
            disabled={value <= min}
            className="flex h-8 w-8 items-center justify-center rounded-l-md border border-r-0 border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Decrease value"
          >
            <MinusIcon className="h-3 w-3" />
          </button>
          <div className="flex h-8 min-w-16 items-center justify-center border-y border-input bg-background px-3 text-sm font-medium">
            {value} {unit}
          </div>
          <button
            onClick={handleIncrement}
            disabled={value >= max}
            className="flex h-8 w-8 items-center justify-center rounded-r-md border border-l-0 border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            aria-label="Increase value"
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/70 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Range indicators */}
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>
          {min} {unit}
        </span>
        <span>
          {max} {unit}
        </span>
      </div>
    </div>
  );
}
