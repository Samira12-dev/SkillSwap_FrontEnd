import { Link } from "react-router-dom";
import { MdWavingHand, MdSwapHoriz, MdEvent, MdMessage, MdNotifications, MdAdd, MdSearch } from "react-icons/md";
import "../../App.css";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../../services/authService";
import { getUserDashboard } from "../../services/dashboardService";
import { getReceivedRequests } from "../../services/swapRequestService";
import { getMySessions } from "../../services/sessionService";
import { AuthContext } from "../../context/AuthContext";

function UserDashboard() {

    const { user } = useContext(AuthContext);

    const [dashboard, setDashboard] = useState({
        pendingRequests: 0,
        upcomingSessions: 0,
        unreadMessages: 0,
        notifications: 0
    });

    const [pendingRequests, setPendingRequests] = useState([]);
    const [upcomingSessions, setUpcomingSessions] = useState([]);

    useEffect(() => {
        if (!user) {
            return;
        }

        getUserDashboard(user.id)
            .then((data) => {
                setDashboard(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }

        getReceivedRequests(user.id)
            .then((requests) => {
                const pending = requests.content.filter(
                    (request) => request.swapStatus === "PENDING"
                );

                setPendingRequests(pending);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }

        getMySessions(user.id)
            .then((sessions) => {
                const upcoming = sessions.content.filter(
                    (session) => new Date(session.date) > new Date()
                );

                setUpcomingSessions(upcoming);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);

    return (
        <div className="user-dashboard">
            <div className="welcome-header">
                <h2>
                    Good morning, {user?.firstName}!
                    <MdWavingHand className="gold-icon" />
                </h2>
                <p>Here's what's happening with your skill swaps today.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">PENDING REQUESTS</span>
                        <span className="stat-value">{dashboard.pendingRequests}</span>
                    </div>
                    <div className="stat-icon yellow-bg">
                        <MdSwapHoriz />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">UPCOMING SESSIONS</span>
                        <span className="stat-value">{dashboard.upcomingSessions}</span>
                    </div>
                    <div className="stat-icon green-bg">
                        <MdEvent />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">UNREAD MESSAGES</span>
                        <span className="stat-value">{dashboard.unreadMessages}</span>
                    </div>
                    <div className="stat-icon blue-bg">
                        <MdMessage />
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">NOTIFICATIONS</span>
                        <span className="stat-value">{dashboard.notifications}</span>
                    </div>
                    <div className="stat-icon red-bg">
                        <MdNotifications />
                    </div>
                </div>
            </div>

            <div className="dashboard-card-box">
                <h3>Quick Actions</h3>

                <div className="actions-grid">
                    <Link to="/skills" className="action-btn purple">
                        <MdAdd />
                        <span>Add Skill</span>
                    </Link>

                    <Link to="/discover" className="action-btn green">
                        <MdSearch />
                        <span>Discover</span>
                    </Link>

                    <Link to="/swap-requests" className="action-btn yellow">
                        <MdSwapHoriz />
                        <span>Requests</span>
                    </Link>

                    <Link to="/messages" className="action-btn purple-light">
                        <MdMessage />
                        <span>Messages</span>
                    </Link>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card-box">
                    <div className="card-header">
                        <h3>Pending Requests</h3>
                        <Link to="/swap-requests" className="link-btn">
                            View all
                        </Link>
                    </div>

                    <div className="request-box">
                        {pendingRequests.length === 0 ? (
                            <div className="request-top">
                                <div className="user-profile">
                                    <div>
                                        <h4>No pending requests</h4>
                                        <span className="location">
                                            You don't have any pending requests.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            pendingRequests.slice(0, 3).map((request) => (
                                <div className="request-top" key={request.id}>
                                    <div className="user-profile">
                                        <div>
                                            <h4>
                                                {request.senderName}
                                            </h4>
                                            <span className="location">
                                                Pending skill exchange request
                                            </span>
                                        </div>
                                    </div>

                                    <span className="badge-status yellow">
                                        Pending
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <Link to="/swap-requests" className="btn-block">
                        Manage all requests
                    </Link>
                </div>

                <div className="dashboard-card-box">
                    <div className="card-header">
                        <h3>Upcoming Sessions</h3>
                        <Link to="/sessions" className="link-btn">
                            View all
                        </Link>
                    </div>

                    <div className="session-box">
                        {upcomingSessions.length === 0 ? (
                            <div className="session-item">
                                <div className="date-badge blue">
                                    <span className="month">SESSIONS</span>
                                    <span className="day">0</span>
                                </div>

                                <div className="session-info">
                                    <h4>No upcoming sessions</h4>
                                    <p>You don't have any upcoming sessions.</p>
                                </div>
                            </div>
                        ) : (
                            upcomingSessions.slice(0, 3).map((session) => (
                                <div className="session-item" key={session.id}>
                                    <div className="date-badge blue">
                                        <span className="month">
                                            {new Date(session.date)
                                                .toLocaleDateString("en-US", {
                                                    month: "short"
                                                })
                                                .toUpperCase()}
                                        </span>
                                        <span className="day">
                                            {new Date(session.date).getDate()}
                                        </span>
                                    </div>

                                    <div className="session-info">
                                        <h4>{session.mode}</h4>
                                        <p>
                                            {new Date(session.date).toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric"
                                                }
                                            )}
                                            {" • "}
                                            {session.duration} min
                                        </p>
                                    </div>

                                    <Link to="/sessions" className="btn-sm">
                                        View
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;