"use client";

import * as React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// Toast types
export type ToastType = "success" | "error" | "warning" | "info";

// Toast data interface
export interface Toast {
  id: string;
  message: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

// Toast context state interface
interface ToastContextState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

// Default context value
const defaultToastContext: ToastContextState = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  removeAllToasts: () => {},
};

// Create context
const ToastContext = createContext<ToastContextState>(defaultToastContext);

// Toast reducer actions
type ToastAction =
  | { type: "ADD_TOAST"; payload: Toast }
  | { type: "REMOVE_TOAST"; payload: string }
  | { type: "REMOVE_ALL_TOASTS" };

// Toast reducer
const toastReducer = (state: Toast[], action: ToastAction): Toast[] => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((toast) => toast.id !== action.payload);
    case "REMOVE_ALL_TOASTS":
      return [];
    default:
      return state;
  }
};

// Toast provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  // Add toast
  const addToast = (toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    const newToast = { id, ...toast };
    dispatch({ type: "ADD_TOAST", payload: newToast });
  };

  // Remove toast
  const removeToast = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  };

  // Remove all toasts
  const removeAllToasts = () => {
    dispatch({ type: "REMOVE_ALL_TOASTS" });
  };

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
  };

  // Create portal for toasts
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <ToastContainer toasts={toasts} removeToast={removeToast} />,
          document.body
        )}
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Icon component based on toast type
function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case "success":
      return <CheckCircle className="size-4 text-green-500" />;
    case "error":
      return <AlertCircle className="size-4 text-red-500" />;
    case "warning":
      return <AlertTriangle className="size-4 text-amber-500" />;
    case "info":
      return <Info className="size-4 text-blue-500" />;
    default:
      return null;
  }
}

// Toast container component
function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-4 gap-2 max-h-screen overflow-hidden pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Individual toast item component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  // Auto-close toast after duration
  useEffect(() => {
    if (toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose();
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  // Get toast background based on type
  const getToastBackground = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20 hover:border-green-500/30";
      case "error":
        return "bg-red-500/10 border-red-500/20 hover:border-red-500/30";
      case "warning":
        return "bg-amber-500/10 border-amber-500/20 hover:border-amber-500/30";
      case "info":
        return "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/30";
      default:
        return "bg-muted/70 border-border hover:border-border/80";
    }
  };

  return (
    <div
      className={cn(
        "flex items-start w-full max-w-sm rounded-xl border-2 backdrop-blur-sm p-4 shadow-sm",
        "transform transition-all duration-300 ease-in-out",
        "animate-in slide-in-from-right-full fade-in",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out",
        "pointer-events-auto",
        getToastBackground(toast.type)
      )}
    >
      <div className="flex items-start gap-3 w-full">
        <ToastIcon type={toast.type} />

        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-foreground">{toast.message}</p>
          {toast.description && (
            <p className="text-xs text-muted-foreground">{toast.description}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="rounded-full p-1 text-foreground/70 hover:bg-background/50 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
