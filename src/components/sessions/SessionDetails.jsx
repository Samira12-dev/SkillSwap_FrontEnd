import { ArrowLeft, CalendarDays, Clock3, MapPin, Video } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";

function SessionDetails() {
    const { sessionId } = useParams();

    const session = {
        id: sessionId,
        date: "2026-09-20T14:00:00",
        duration: 60,
        mode: "ONLINE",
        status: "CONFIRMED",
        meetingUrl: "https://meet.google.com/abc-defg-hij",
        conversationId: 4
    };

    const date = new Date(session.date);

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="session-details-page">
            <Link
                to="/sessions"
                className="session-back-btn"
            >
                <ArrowLeft size={16} />
                Back to Sessions
            </Link>

            <div className="session-details-header">
                <div>
                    <span className="sessions-label">SESSION</span>
                    <h1>Session Details</h1>
                    <p>View all information about this session.</p>
                </div>

                <span className={`session-status ${session.status.toLowerCase()}`}>
                    {session.status}
                </span>
            </div>

            <div className="session-details-card">
                <div className="session-details-top">
                    <div className="session-details-icon">
                        <CalendarDays size={24} />
                    </div>

                    <div>
                        <h2>Skill Exchange Session</h2>
                        <p>Conversation #{session.conversationId}</p>
                    </div>
                </div>

                <div className="session-details-grid">
                    <div className="session-detail-item">
                        <CalendarDays size={18} />
                        <div>
                            <span>Date</span>
                            <strong>{formattedDate}</strong>
                        </div>
                    </div>

                    <div className="session-detail-item">
                        <Clock3 size={18} />
                        <div>
                            <span>Time</span>
                            <strong>
                                {formattedTime}
                            </strong>
                        </div>
                    </div>

                    <div className="session-detail-item">
                        <Clock3 size={18} />
                        <div>
                            <span>Duration</span>
                            <strong>
                                {session.duration} minutes
                            </strong>
                        </div>
                    </div>

                    <div className="session-detail-item">
                        {session.mode === "ONLINE" ? (
                            <Video size={18} />
                        ) : (
                            <MapPin size={18} />
                        )}

                        <div>
                            <span>Mode</span>
                            <strong>
                                {session.mode === "ONLINE"
                                    ? "Online"
                                    : "Presentiel"}
                            </strong>
                        </div>
                    </div>
                </div>

                {session.mode === "ONLINE" && session.meetingUrl && (
                    <div className="session-meeting-box">
                        <div>
                            <span>Google Meet</span>
                            <p>Join this session online.</p>
                        </div>

                        <a
                            href={session.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="session-join-btn"
                        >
                            <Video size={15} />
                            Join Session
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SessionDetails;