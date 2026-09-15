import { Link } from "react-router-dom";
import {
    CalendarDays,
    Check,
    Clock3,
    ExternalLink,
    MapPin,
    Video,
    X
} from "lucide-react";
import "../../App.css";

function SessionCard({
    session,
    onAccept,
    onCancel,
    onComplete
}) {
    const status = session.status.toLowerCase();

    const sessionDate = new Date(session.date);

    const month = sessionDate
        .toLocaleString("en-US", {
            month: "short"
        })
        .toUpperCase();

    const day = sessionDate.getDate();

    const time = sessionDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="session-card">
            <div className="session-card-top">
                <div className="session-date">
                    <span>{month}</span>
                    <strong>{day}</strong>
                </div>

                <div className="session-user">
                    <div className="session-avatar">
                        {session.userName?.charAt(0)}
                    </div>

                    <div>
                        <h3>
                            {session.skillName || "Skill Exchange"}
                        </h3>

                        <p>
                            with {session.userName || "User"}
                        </p>
                    </div>
                </div>

                <div className={`session-status ${status}`}>
                    {status === "confirmed" && (
                        <Check size={13} />
                    )}

                    {status === "proposed" && (
                        <Clock3 size={13} />
                    )}

                    {status === "completed" && (
                        <Check size={13} />
                    )}

                    {status === "cancelled" && (
                        <X size={13} />
                    )}

                    {session.status}
                </div>
            </div>

            <div className="session-meta">
                <span>
                    <Clock3 size={14} />
                    {time} · {session.duration} min
                </span>

                <span>
                    {session.mode === "ONLINE" ? (
                        <Video size={14} />
                    ) : (
                        <MapPin size={14} />
                    )}

                    {session.mode === "ONLINE"
                        ? "Online"
                        : "Presentiel"}
                </span>
            </div>

            <div className="session-actions">
        
                <Link
                    to={`/sessions/${session.id}`}
                    className="session-view-btn"
                >
                    <ExternalLink size={14} />
                    View details
                </Link>

                {session.status === "PROPOSED" && (
                    <button
                        className="session-join-btn"
                        onClick={() => onAccept(session.id)}
                    >
                        <Check size={14} />
                        Accept
                    </button>
                )}

                {session.status === "CONFIRMED" &&
                    session.mode === "ONLINE" &&
                    session.meetingUrl && (
                        <a
                            href={session.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="session-join-btn"
                        >
                            <Video size={14} />
                            Join Session
                        </a>
                    )}

                {session.status !== "COMPLETED" &&
                    session.status !== "CANCELLED" && (
                        <button
                            className="session-cancel-btn"
                            onClick={() => onCancel(session.id)}
                        >
                            <X size={14} />
                            Cancel
                        </button>
                    )}

                {session.status === "CONFIRMED" && (
                    <button
                        className="session-complete-btn"
                        onClick={() => onComplete(session.id)}
                    >
                        <Check size={14} />
                        Mark complete
                    </button>
                )}
            </div>
        </div>
    );
}

export default SessionCard;