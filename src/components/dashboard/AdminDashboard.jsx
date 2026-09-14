
import { Link } from "react-router-dom";
import "../../App.css";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">

            <div className="admin-welcome">
                <div>
                    <h2>Admin Dashboard</h2>
                    <p>Overview of the SkillSwap platform.</p>
                </div>
            </div>

            <div className="admin-stats-grid">

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">TOTAL USERS</span>
                        <strong className="admin-stat-value">125</strong>
                    </div>

                    <div className="admin-stat-icon purple">
                        👤
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">TOTAL SKILLS</span>
                        <strong className="admin-stat-value">48</strong>
                    </div>

                    <div className="admin-stat-icon green">
                        🏆
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">TOTAL SWAP REQUESTS</span>
                        <strong className="admin-stat-value">73</strong>
                    </div>

                    <div className="admin-stat-icon yellow">
                        ↔
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">ACTIVE SESSIONS</span>
                        <strong className="admin-stat-value">12</strong>
                    </div>

                    <div className="admin-stat-icon blue">
                        ▣
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">COMPLETED SESSIONS</span>
                        <strong className="admin-stat-value">31</strong>
                    </div>

                    <div className="admin-stat-icon success">
                        ✓
                    </div>
                </div>

            </div>

            <div className="admin-content-grid">

                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <h3>Platform Overview</h3>
                            <p>Current platform statistics.</p>
                        </div>
                    </div>

                    <div className="overview-list">

                        <div className="overview-item">
                            <div className="overview-item-left">
                                <span className="overview-icon purple">👤</span>
                                <div>
                                    <span className="overview-title">Users</span>
                                    <span className="overview-description">
                                        Registered users
                                    </span>
                                </div>
                            </div>

                            <strong>125</strong>
                        </div>

                        <div className="overview-item">
                            <div className="overview-item-left">
                                <span className="overview-icon green">🏆</span>
                                <div>
                                    <span className="overview-title">Skills</span>
                                    <span className="overview-description">
                                        Available skills
                                    </span>
                                </div>
                            </div>

                            <strong>48</strong>
                        </div>

                        <div className="overview-item">
                            <div className="overview-item-left">
                                <span className="overview-icon yellow">↔</span>
                                <div>
                                    <span className="overview-title">Swap Requests</span>
                                    <span className="overview-description">
                                        Total requests
                                    </span>
                                </div>
                            </div>

                            <strong>73</strong>
                        </div>

                        <div className="overview-item">
                            <div className="overview-item-left">
                                <span className="overview-icon blue">▣</span>
                                <div>
                                    <span className="overview-title">Active Sessions</span>
                                    <span className="overview-description">
                                        Confirmed sessions
                                    </span>
                                </div>
                            </div>

                            <strong>12</strong>
                        </div>

                        <div className="overview-item">
                            <div className="overview-item-left">
                                <span className="overview-icon success">✓</span>
                                <div>
                                    <span className="overview-title">Completed Sessions</span>
                                    <span className="overview-description">
                                        Finished sessions
                                    </span>
                                </div>
                            </div>

                            <strong>31</strong>
                        </div>

                    </div>
                </div>

                <div className="admin-panel">
                    <div className="admin-panel-header">
                        <div>
                            <h3>Quick Actions</h3>
                            <p>Manage the platform.</p>
                        </div>
                    </div>

                    <div className="admin-actions">

                        <Link to="/users" className="admin-action">
                            <span className="admin-action-icon purple">👤</span>
                            <div>
                                <strong>Manage Users</strong>
                                <span>View and manage users</span>
                            </div>
                            <span className="admin-action-arrow">→</span>
                        </Link>

                        <Link to="/skills" className="admin-action">
                            <span className="admin-action-icon green">🏆</span>
                            <div>
                                <strong>Manage Skills</strong>
                                <span>View available skills</span>
                            </div>
                            <span className="admin-action-arrow">→</span>
                        </Link>

                        <Link to="/swap-requests" className="admin-action">
                            <span className="admin-action-icon yellow">↔</span>
                            <div>
                                <strong>Swap Requests</strong>
                                <span>Review all requests</span>
                            </div>
                            <span className="admin-action-arrow">→</span>
                        </Link>

                        <Link to="/sessions" className="admin-action">
                            <span className="admin-action-icon blue">▣</span>
                            <div>
                                <strong>Manage Sessions</strong>
                                <span>View platform sessions</span>
                            </div>
                            <span className="admin-action-arrow">→</span>
                        </Link>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
