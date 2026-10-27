import { formatStatus } from "../../utils/format";

const STATUS_TONES = {
    PENDING: "warning",
    PROPOSED: "warning",
    ACCEPTED: "success",
    CONFIRMED: "success",
    COMPLETED: "info",
    REJECTED: "danger",
    CANCELLED: "neutral",
    ONLINE: "info",
    PRESENTIEL: "purple",
    OFFER: "success",
    WANTED: "purple",
    ADMIN: "danger",
    USER: "info"
};

export default function StatusBadge({ status, label, tone, className = "" }) {
    if (!status && !label) return null;

    const resolvedTone = tone || STATUS_TONES[status] || "neutral";

    return (
        <span className={`ui-badge ui-badge--${resolvedTone} ${className}`.trim()}>
            <span className="ui-badge-dot" aria-hidden="true" />
            {label || formatStatus(status)}
        </span>
    );
}
