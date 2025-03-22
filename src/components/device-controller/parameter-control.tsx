"use client";

import { useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface ParameterControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
  description?: string;
  decimalPlaces?: number;
}

export function ParameterControl({
  label,
  value,
  min,
  max,
  step = 0.5,
  onChange,
  unit = "cm",
  description,
  decimalPlaces = 1,
}: ParameterControlProps) {
  const [inputValue, setInputValue] = useState(value.toFixed(decimalPlaces));
  const [isFocused, setIsFocused] = useState(false);

  // Update input value when the prop value changes (from slider)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toFixed(decimalPlaces));
    }
  }, [value, decimalPlaces, isFocused]);

  // Handle direct input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle input blur - validate and update the value
  const handleInputBlur = () => {
    setIsFocused(false);

    let newValue = parseFloat(inputValue);

    // Handle invalid input
    if (isNaN(newValue)) {
      setInputValue(value.toFixed(decimalPlaces));
      return;
    }

    // Clamp value between min and max
    newValue = Math.max(min, Math.min(max, newValue));

    // Round to step precision
    newValue = Math.round(newValue / step) * step;

    // Update both local state and parent
    setInputValue(newValue.toFixed(decimalPlaces));
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium">{label}</label>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[200px]">
                  {description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />

        <div className="flex items-center">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            className="w-16 h-8 text-right"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputBlur();
              }
            }}
          />
          <span className="text-xs text-muted-foreground ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}
