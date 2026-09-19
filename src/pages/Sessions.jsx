import {
    CalendarDays,
    CheckCircle2,
    Plus,
    XCircle
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import SessionList from "../components/sessions/SessionList";
import SessionForm from "../components/sessions/SessionForm";
import { AuthContext } from "../context/AuthContext";
import {
    getMySessions,
    createSession,
    acceptSession,
    cancelSession,
    completeSession
} from "../services/sessionService";
import { getMyConversations } from "../services/conversationService";

function Sessions() {
    const { user } = useContext(AuthContext);

    const [sessions, setSessions] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        getMySessions(user.id)
            .then((data) => {
                setSessions(data.content || []);
            })
            .catch((error) => {
                console.error("Erro in session:", error);
            });

        getMyConversations(user.id)
            .then((data) => {
                const list = data.content || [];

                const formattedList = list.map((conversation) => ({
                    ...conversation,
                    name:
                        conversation.senderId === user.id
                            ? conversation.receiverName
                            : conversation.senderName
                }));

                setConversations(formattedList);
            })
            .catch((error) => {
                console.error("eror of conversation:", error);
            });
    }, [user]);

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

    const handleSchedule = async (data) => {
        try {
            const session = await createSession(data, user.id);

            setSessions((prev) => [...prev, session]);
            setShowForm(false);
        } catch (error) {
            console.error("Error in Create session:", error);
        }
    };

    const handleAccept = async (id) => {
        try {
            const session = await acceptSession(id, user.id);

            setSessions((prev) =>
                prev.map((item) =>
                    item.id === id ? session : item
                )
            );
        } catch (error) {
            console.error("accept error:", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            const session = await cancelSession(id, user.id);

            setSessions((prev) =>
                prev.map((item) =>
                    item.id === id ? session : item
                )
            );
        } catch (error) {
            console.error("CANCEL ERROR:", error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const session = await completeSession(id, user.id);

            setSessions((prev) =>
                prev.map((item) =>
                    item.id === id ? session : item
                )
            );
        } catch (error) {
            console.error("COMPLETE ERROR:", error);
        }
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
                    conversations={conversations}
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