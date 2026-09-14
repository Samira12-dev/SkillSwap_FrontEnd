
import { Link } from "react-router-dom";
import "../../App.css";

function UserDashboard() {
    return (
        <div className="user-dashboard">

            <div className="welcome-header">
                <h2>Good morning, Samira! 👋</h2>
                <p>Here's what's happening with your skill swaps today.</p>
            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">PENDING REQUESTS</span>
                        <span className="stat-value">1</span>
                        <span className="stat-sub font-yellow">
                            +1 awaiting response
                        </span>
                    </div>

                    <div className="stat-icon yellow-bg">↔</div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">UPCOMING SESSIONS</span>
                        <span className="stat-value">2</span>
                    </div>

                    <div className="stat-icon green-bg">▣</div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">UNREAD MESSAGES</span>
                        <span className="stat-value">2</span>
                    </div>

                    <div className="stat-icon blue-bg">💬</div>
                </div>

                <div className="stat-card">
                    <div className="stat-info">
                        <span className="stat-label">NOTIFICATIONS</span>
                        <span className="stat-value">3</span>
                    </div>

                    <div className="stat-icon red-bg">🔔</div>
                </div>

            </div>

            <div className="dashboard-grid">

                <div className="left-section">

                    <div className="dashboard-card-box">
                        <h3>Quick Actions</h3>

                        <div className="actions-grid">
                            <Link to="/skills" className="action-btn purple">
                                <span>＋</span>
                                <span>Add Skill</span>
                            </Link>

                            <Link to="/discover" className="action-btn green">
                                <span>⌕</span>
                                <span>Discover</span>
                            </Link>

                            <Link to="/swap-requests" className="action-btn yellow">
                                <span>↔</span>
                                <span>Requests</span>
                            </Link>

                            <Link to="/messages" className="action-btn purple-light">
                                <span>💬</span>
                                <span>Messages</span>
                            </Link>

                            <Link to="/sessions" className="action-btn green-light">
                                <span>▣</span>
                                <span>Sessions</span>
                            </Link>

                            <Link to="/notifications" className="action-btn red-light">
                                <span>🔔</span>
                                <span>Notifications</span>
                            </Link>
                        </div>
                    </div>

                    <div className="dashboard-card-box">
                        <div className="card-header">
                            <h3>Pending Requests</h3>
                            <Link to="/swap-requests" className="link-btn">
                                View all
                            </Link>
                        </div>

                        <div className="request-box">
                            <div className="request-top">
                                <div className="user-profile">
                                    <img
                                        src="https://i.pravatar.cc/100?img=5"
                                        alt="Sarah"
                                    />

                                    <div>
                                        <h4>Sarah Chen</h4>
                                        <span className="location">
                                            New York, NY
                                        </span>
                                    </div>
                                </div>

                                <span className="badge-status yellow">
                                    Pending
                                </span>
                            </div>

                            <p className="request-text">
                                Hi Alex! I'd love to learn React from you. I can
                                offer comprehensive UI/UX design sessions in
                                exchange. I think we'd make a great learning pair!
                            </p>

                            <div className="skills-exchange">
                                <span>
                                    <strong>Offering:</strong> UI/UX Design
                                </span>

                                <span>
                                    <strong>Wants:</strong> React Development
                                </span>
                            </div>
                        </div>

                        <Link
                            to="/swap-requests"
                            className="btn-block"
                        >
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

                        <div className="session-item">
                            <div className="date-badge blue">
                                <span className="month">AUG</span>
                                <span className="day">30</span>
                            </div>

                            <div className="session-info">
                                <h4>Guitar with Marcus</h4>
                                <p>02:00 PM - 60min • Online</p>
                            </div>

                            <button className="btn-sm">
                                Join
                            </button>
                        </div>

                        <div className="session-item">
                            <div className="date-badge purple">
                                <span className="month">SEP</span>
                                <span className="day">5</span>
                            </div>

                            <div className="session-info">
                                <h4>UI/UX Design with Sarah</h4>
                                <p>11:00 AM - 90min • Online</p>
                            </div>

                            <button className="btn-sm">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                <div className="right-section">

                    <div className="dashboard-card-box">
                        <div className="card-header">
                            <h3>My Skills</h3>

                            <Link to="/skills" className="link-btn">
                                Manage
                            </Link>
                        </div>

                        <div className="skill-group">
                            <span className="skill-label">OFFERING</span>

                            <div className="skill-item">
                                <span>React Development</span>
                                <span className="tag green">Advanced</span>
                            </div>

                            <div className="skill-item">
                                <span>Node.js & APIs</span>
                                <span className="tag green">Advanced</span>
                            </div>

                            <div className="skill-item">
                                <span>TypeScript</span>
                                <span className="tag yellow">Intermediate</span>
                            </div>
                        </div>

                        <div className="skill-group">
                            <span className="skill-label">WANTED</span>

                            <div className="tags-flex">
                                <span className="tag blue">Photography</span>
                                <span className="tag blue">Spanish</span>
                            </div>
                        </div>

                        <Link to="/skills" className="btn-add-skill">
                            ＋ Add a skill
                        </Link>
                    </div>

                    <div className="dashboard-card-box">
                        <div className="card-header">
                            <h3>Messages</h3>

                            <Link to="/messages" className="link-btn">
                                View all
                            </Link>
                        </div>

                        <div className="msg-list">

                            <div className="msg-item">
                                <img
                                    src="https://i.pravatar.cc/100?img=11"
                                    alt="Marcus"
                                />

                                <div className="msg-content">
                                    <h4>Marcus Rivera</h4>
                                    <p>
                                        Actually, do you have any particular
                                        goals for guitar?
                                    </p>
                                </div>
                            </div>

                            <div className="msg-item">
                                <img
                                    src="https://i.pravatar.cc/100?img=5"
                                    alt="Sarah"
                                />

                                <div className="msg-content">
                                    <h4>Sarah Chen</h4>
                                    <p>
                                        Your design portfolio is really impressive!
                                    </p>
                                </div>
                            </div>

                            <div className="msg-item">
                                <img
                                    src="https://i.pravatar.cc/100?img=9"
                                    alt="Aisha"
                                />

                                <div className="msg-content">
                                    <h4>Aisha Patel</h4>
                                    <p>
                                        Thank you for the yoga sessions!
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserDashboard;

