import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({
    title = "We couldn't load this page",
    message = "Please try again in a moment.",
    onRetry,
    className = ""
}) {
    return (
        <div className={`ui-error-state ${className}`.trim()} role="alert">
            <span className="ui-error-icon" aria-hidden="true">
                <AlertTriangle size={24} />
            </span>
            <h3>{title}</h3>
            <p>{message}</p>
            {onRetry && (
                <button type="button" className="btn btn-secondary" onClick={onRetry}>
                    <RefreshCw size={16} />
                    Try again
                </button>
            )}
        </div>
    );
}
