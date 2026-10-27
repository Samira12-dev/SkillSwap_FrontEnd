import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const TOAST_ICONS = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timers = useRef(new Map());
    const nextId = useRef(0);

    const dismissToast = useCallback((id) => {
        const timer = timers.current.get(id);

        if (timer) {
            window.clearTimeout(timer);
            timers.current.delete(id);
        }

        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const pushToast = useCallback((message, type = "info", duration = 4500) => {
        if (!message) return null;

        const id = nextId.current;
        nextId.current += 1;

        setToasts((current) => [...current, { id, message, type }]);

        if (duration > 0) {
            const timer = window.setTimeout(() => {
                dismissToast(id);
            }, duration);

            timers.current.set(id, timer);
        }

        return id;
    }, [dismissToast]);

    useEffect(() => {
        const activeTimers = timers.current;

        return () => {
            activeTimers.forEach((timer) => window.clearTimeout(timer));
            activeTimers.clear();
        };
    }, []);

    const value = useMemo(() => ({
        toast: pushToast,
        success: (message, duration) => pushToast(message, "success", duration),
        error: (message, duration) => pushToast(message, "error", duration),
        info: (message, duration) => pushToast(message, "info", duration),
        dismiss: dismissToast
    }), [dismissToast, pushToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="toast-viewport" aria-live="polite" aria-atomic="false">
                {toasts.map((toast) => {
                    const Icon = TOAST_ICONS[toast.type] || Info;

                    return (
                        <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
                            <Icon size={19} aria-hidden="true" />
                            <p>{toast.message}</p>
                            <button
                                type="button"
                                className="toast-close"
                                onClick={() => dismissToast(toast.id)}
                                aria-label="Dismiss notification"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}
