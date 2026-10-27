import { Inbox } from "lucide-react";

export default function EmptyState({
    icon: Icon = Inbox,
    title = "Nothing here yet",
    description,
    action,
    className = ""
}) {
    return (
        <div className={`ui-empty ${className}`.trim()}>
            <span className="ui-empty-icon" aria-hidden="true">
                <Icon size={24} />
            </span>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {action && <div className="ui-empty-action">{action}</div>}
        </div>
    );
}
