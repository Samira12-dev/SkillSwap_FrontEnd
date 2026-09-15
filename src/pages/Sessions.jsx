import { useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Plus,
    XCircle
} from "lucide-react";
import "../App.css";
import SessionList from "../components/sessions/SessionList";
import SessionForm from "../components/sessions/SessionForm";

function Sessions() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showForm, setShowForm] = useState(false);

    const [sessions, setSessions] = useState([
        {
            id: 1,
            date: "2026-09-20T14:00:00",
            duration: 60,
            mode: "ONLINE",
            status: "CONFIRMED",
            conversationId: 4,
            skillName: "Java",
            userName: "Yassine Amrani"
        },
        {
            id: 2,
            date: "2026-09-25T16:30:00",
            duration: 45,
            mode: "ONLINE",
            status: "PROPOSED",
            conversationId: 5,
            skillName: "React",
            userName: "Sarah Chen"
        },
        {
            id: 3,
            date: "2026-08-22T15:00:00",
            duration: 60,
            mode: "ONLINE",
            status: "COMPLETED",
            conversationId: 6,
            skillName: "English",
            userName: "Sara Alaoui"
        }
    ]);

    const upcomingSessions = sessions.filter(
        (session) =>
            session.status === "PROPOSED" ||
            session.status === "CONFIRMED"
    );

    const completedSessions = sessions.filter(
        (session) => session.status === "COMPLETED"
    );

    const cancelledSessions = sessions.filter(
        (session) => session.status === "CANCELLED"
    );

    let displayedSessions = upcomingSessions;

    if (activeTab === "completed") {
        displayedSessions = completedSessions;
    }

    if (activeTab === "cancelled") {
        displayedSessions = cancelledSessions;
    }

    const handleSchedule = (data) => {
        console.log("Schedule session:", data);
        setShowForm(false);
    };

    const handleAccept = (id) => {
        console.log("Accept session:", id);
    };

    const handleCancel = (id) => {
        console.log("Cancel session:", id);
    };

    const handleComplete = (id) => {
        console.log("Complete session:", id);
    };

    return (
        <div className="sessions-page">
            <div className="sessions-header">
                <div>
                    <span className="sessions-label">SKILLSWAP</span>
                    <h1>Sessions</h1>
                    <p>Manage your skill exchange sessions</p>
                </div>

                <button
                    className="session-schedule-btn"
                    onClick={() => setShowForm(true)}
                >
                    <Plus size={17} />
                    Schedule Session
                </button>
            </div>

            {showForm && (
                <SessionForm
                    onSubmit={handleSchedule}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <div className="session-stats">
                <div className="session-stat-card">
                    <div className="session-stat-icon upcoming">
                        <CalendarDays size={18} />
                    </div>

                    <div>
                        <span>Upcoming</span>
                        <strong>{upcomingSessions.length}</strong>
                    </div>
                </div>

                <div className="session-stat-card">
                    <div className="session-stat-icon completed">
                        <CheckCircle2 size={18} />
                    </div>

                    <div>
                        <span>Completed</span>
                        <strong>{completedSessions.length}</strong>
                    </div>
                </div>

                <div className="session-stat-card">
                    <div className="session-stat-icon cancelled">
                        <XCircle size={18} />
                    </div>

                    <div>
                        <span>Cancelled</span>
                        <strong>{cancelledSessions.length}</strong>
                    </div>
                </div>
            </div>

            <div className="sessions-content">
                <div className="session-tabs">
                    <button
                        className={
                            activeTab === "upcoming"
                                ? "session-tab active"
                                : "session-tab"
                        }
                        onClick={() => setActiveTab("upcoming")}
                    >
                        Upcoming
                        <span>{upcomingSessions.length}</span>
                    </button>

                    <button
                        className={
                            activeTab === "completed"
                                ? "session-tab active"
                                : "session-tab"
                        }
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed
                        <span>{completedSessions.length}</span>
                    </button>

                    <button
                        className={
                            activeTab === "cancelled"
                                ? "session-tab active"
                                : "session-tab"
                        }
                        onClick={() => setActiveTab("cancelled")}
                    >
                        Cancelled
                        <span>{cancelledSessions.length}</span>
                    </button>
                </div>

                <div className="sessions-list-header">
                    <h2>
                        {activeTab === "upcoming" && "Upcoming Sessions"}
                        {activeTab === "completed" && "Completed Sessions"}
                        {activeTab === "cancelled" && "Cancelled Sessions"}
                    </h2>

                    <p>
                        {activeTab === "upcoming" &&
                            "Your scheduled skill exchange sessions"}

                        {activeTab === "completed" &&
                            "Sessions you have already completed"}

                        {activeTab === "cancelled" &&
                            "Sessions that were cancelled"}
                    </p>
                </div>

                <SessionList
                    sessions={displayedSessions}
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                    onComplete={handleComplete}
                />
            </div>
        </div>
    );
}

export default Sessions;