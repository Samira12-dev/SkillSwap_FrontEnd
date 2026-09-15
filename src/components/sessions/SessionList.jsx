import { CalendarDays } from "lucide-react";
import SessionCard from "./SessionCard";
import "../../App.css";

function SessionList({
    sessions,
    onAccept,
    onCancel,
    onComplete
}) {
    if (!sessions || sessions.length === 0) {
        return (
            <div className="session-empty">
                <div className="session-empty-icon">
                    <CalendarDays size={22} />
                </div>

                <h3>No sessions found</h3>

                <p>There are no sessions in this section.</p>
            </div>
        );
    }

    return (
        <div className="session-list">
            {sessions.map((session) => (
                <SessionCard
                    key={session.id}
                    session={session}
                    onAccept={onAccept}
                    onCancel={onCancel}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}

export default SessionList;