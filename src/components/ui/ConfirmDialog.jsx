import { useEffect, useId, useRef } from "react";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
    open,
    title = "Are you sure?",
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    tone = "danger",
    loading = false,
    onConfirm,
    onCancel
}) {
    const titleId = useId();
    const descriptionId = useId();
    const cancelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && !loading) {
                onCancel?.();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);
        cancelRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [loading, onCancel, open]);

    if (!open) return null;

    return (
        <div
            className="ui-modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !loading) onCancel?.();
            }}
        >
            <div
                className="ui-modal ui-confirm"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
            >
                <span className={`ui-confirm-icon ui-confirm-icon--${tone}`} aria-hidden="true">
                    <AlertTriangle size={22} />
                </span>
                <h2 id={titleId}>{title}</h2>
                {description && <p id={descriptionId}>{description}</p>}
                <div className="ui-modal-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                        ref={cancelRef}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={`btn ${tone === "danger" ? "btn-danger" : "btn-primary"}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading && <span className="ui-button-spinner" aria-hidden="true" />}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
