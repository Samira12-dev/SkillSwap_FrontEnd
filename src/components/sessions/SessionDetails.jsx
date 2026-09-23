import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    MapPin,
    Star,
    Video
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import { getSessionById } from "../../services/sessionService";
import { getConversationById } from "../../services/conversationService";
import { createReview } from "../../services/reviewService";
import ReviewForm from "../reviews/ReviewForm";
import { AuthContext } from "../../context/AuthContext";

function SessionDetails() {
    const { sessionId } = useParams();
    const { user } = useContext(AuthContext);

    const [session, setSession] = useState(null);
    const [reviewee, setReviewee] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    useEffect(() => {
        getSessionById(sessionId)
            .then((data) => {
                setSession(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [sessionId]);

    useEffect(() => {
        if (!session || !user?.id || session.status !== "COMPLETED") return;

        getConversationById(session.conversationId, user.id)
            .then((conversation) => {
                const isSender = conversation.senderId === user.id;

                setReviewee({
                    id: isSender ? conversation.receiverId : conversation.senderId,
                    name: isSender ? conversation.receiverName : conversation.senderName
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [session, user]);

    const handleReviewSubmit = async (data) => {
        try {
            await createReview(user.id, {
                ...data,
                revieweeId: reviewee.id,
                sessionId: session.id
            });

            setShowReviewForm(false);
            setReviewSubmitted(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (!session) {
        return <div className="session-details-page">Loading...</div>;
    }

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

                <span
                    className={`session-status ${session.status.toLowerCase()}`}
                >
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
                            <strong>{formattedTime}</strong>
                        </div>
                    </div>

                    <div className="session-detail-item">
                        <Clock3 size={18} />
                        <div>
                            <span>Duration</span>
                            <strong>{session.duration} minutes</strong>
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

                {session.status === "COMPLETED" && (
                    <div className="session-review-box">
                        {reviewSubmitted ? (
                            <p>Thanks for leaving a review!</p>
                        ) : showReviewForm ? (
                            <ReviewForm
                                revieweeName={reviewee?.name}
                                onSubmit={handleReviewSubmit}
                                onCancel={() => setShowReviewForm(false)}
                            />
                        ) : (
                            <button
                                className="session-join-btn"
                                onClick={() => setShowReviewForm(true)}
                                disabled={!reviewee}
                            >
                                <Star size={15} />
                                Leave a Review
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SessionDetails;
