"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SizingCardProps {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange?: (value: number) => void;
  className?: string;
}

export function SizingCard({
  label,
  defaultValue = 78,
  min = 60,
  max = 100,
  step = 1,
  unit = "CM",
  onChange,
  className,
}: SizingCardProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate position percentage for the slider thumb
  const percentage = ((value - min) / (max - min)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  // Handle click on a specific position on the scale
  const handleScaleClick = (clickedValue: number) => {
    setValue(clickedValue);
    onChange?.(clickedValue);
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-muted/30 bg-background/50 p-6 backdrop-blur-md shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-medium text-foreground/80">{label}</h3>
        <div className="flex items-center justify-center h-10 min-w-16 rounded-md border border-muted/50 bg-background shadow-sm">
          <span className="text-base font-semibold text-primary">
            {value} {unit}
          </span>
        </div>
      </div>

      {/* Slider container */}
      <div className="relative mt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className={cn(
            "w-full h-6 appearance-none bg-transparent rounded-lg cursor-pointer relative z-20",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary/80 [&::-webkit-slider-thumb]:cursor-grab",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-primary/80 [&::-moz-range-thumb]:cursor-grab",
            isDragging &&
              "[&::-webkit-slider-thumb]:cursor-grabbing [&::-moz-range-thumb]:cursor-grabbing [&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:scale-110"
          )}
        />

        {/* Track background */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-muted/80 z-10"></div>

        {/* Filled track */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary/70 z-10"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Scale markers */}
        <div className="flex justify-between mt-2 px-1 text-xs text-muted-foreground">
          {[...Array(Math.floor((max - min) / 5) + 1)].map((_, index) => {
            const tickValue = min + index * 5;
            return (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleScaleClick(tickValue)}
              >
                <div
                  className={cn(
                    "h-1 w-0.5 mb-1",
                    tickValue <= value ? "bg-primary/70" : "bg-muted"
                  )}
                ></div>
                <span>{tickValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
