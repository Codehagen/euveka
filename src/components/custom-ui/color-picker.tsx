"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorPickerProps {
  label?: string;
  colors?: string[];
  defaultColor?: string;
  onChange?: (color: string) => void;
  className?: string;
}

export function ColorPicker({
  label = "Color",
  colors = [
    "#f9fafb", // White
    "#1f2937", // Dark gray
    "#fef2f2", // Light red
    "#fee2e2", // Red
    "#eff6ff", // Light blue
    "#dbeafe", // Blue
    "#f0fdf4", // Light green
    "#dcfce7", // Green
    "#fef3c7", // Light yellow
    "#fde68a", // Yellow
  ],
  defaultColor,
  onChange,
  className,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    defaultColor || colors[0]
  );

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange?.(color);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-muted/30 bg-background/50 p-6 backdrop-blur-md shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-foreground/80">{label}</h3>
        <div
          className="h-8 w-8 rounded-full border border-muted/30 shadow-sm"
          style={{ backgroundColor: selectedColor }}
        />
      </div>

      <div className="grid grid-cols-5 gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            className={cn(
              "h-10 w-10 rounded-full border transition-all duration-200",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1",
              color === selectedColor
                ? "border-2 border-primary shadow-md"
                : "border-muted/30"
            )}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            aria-label={`Select color ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-muted/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Selected color:</span>
          <span className="text-sm font-medium uppercase">{selectedColor}</span>
        </div>
      </div>
    </div>
  );
}
