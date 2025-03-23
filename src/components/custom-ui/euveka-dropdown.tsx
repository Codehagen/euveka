"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface EuvekaDropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  className?: string;
  multiple?: boolean;
  searchable?: boolean;
  maxHeight?: number;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export function EuvekaDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  label,
  error,
  className,
  multiple = false,
  searchable = false,
  maxHeight = 250,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
}: EuvekaDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle selection and close dropdown for single select
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(optionValue)
        ? currentValues.filter((val) => val !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchValue("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Filter options based on search value
  const filteredOptions =
    searchable && searchValue
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      : options;

  // Determine selected option label
  const getSelectedLabel = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const selected = options.find((opt) => opt.value === value[0]);
        return selected ? selected.label : placeholder;
      }
      return `${value.length} selected`;
    }

    if (!multiple && value) {
      const selected = options.find((opt) => opt.value === value);
      return selected ? selected.label : placeholder;
    }

    return placeholder;
  };

  // Determine if an option is selected
  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Size classes mapping
  const sizeClasses = {
    sm: "text-xs py-1 px-2",
    md: "text-sm py-2 px-3",
    lg: "text-base py-2.5 px-4",
  };

  // Variant classes mapping
  const variantClasses = {
    primary:
      "bg-primary/10 border-primary/20 hover:border-primary/40 text-primary",
    secondary:
      "bg-secondary/10 border-secondary/20 hover:border-secondary/40 text-secondary",
    outline:
      "bg-background/50 border-input hover:border-input/80 text-foreground",
  };

  return (
    <div
      ref={dropdownRef}
      className={cn("relative", fullWidth ? "w-full" : "w-fit", className)}
    >
      {label && (
        <label className="block text-sm font-medium mb-1 text-foreground">
          {label}
        </label>
      )}

      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between rounded-lg border backdrop-blur-sm transition-all duration-300",
          sizeClasses[size],
          variantClasses[variant],
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-muted/50",
          isOpen && "ring-1 ring-ring",
          fullWidth ? "w-full" : "w-fit",
          error && "border-red-500 ring-1 ring-red-500"
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <span className="text-foreground/70">{icon}</span>}
          <span className="truncate">{getSelectedLabel()}</span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 flex-shrink-0 text-foreground/70 ml-2 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full min-w-[180px] rounded-lg border border-border",
            "bg-background/80 backdrop-blur-md shadow-lg ring-1 ring-black/5",
            "animate-in fade-in-0 zoom-in-95 duration-100"
          )}
          style={{ maxHeight }}
        >
          {searchable && (
            <div className="p-2 border-b border-border">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1 text-sm bg-background/50 rounded-md border border-input focus:outline-none focus:ring-1 focus:ring-ring"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div
            className="overflow-auto"
            style={{ maxHeight: searchable ? maxHeight - 45 : maxHeight }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm transition-colors duration-150",
                    isSelected(option.value)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/50",
                    option.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer",
                    multiple && "justify-between"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <span>{option.label}</span>
                  </div>

                  {multiple && isSelected(option.value) && (
                    <Check className="size-4 text-primary" />
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-foreground/70 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
