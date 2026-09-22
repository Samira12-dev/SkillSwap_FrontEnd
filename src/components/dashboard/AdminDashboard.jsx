import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";
import "../../App.css";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSkills: 0,
        totalSwapRequests: 0,
        activeSessions: 0,
        completedSessions: 0
    });

    useEffect(() => {
        getAdminDashboard()
            .then((data) => setStats(data))
            .catch((error) => console.error("ADMIN DASHBOARD ERROR:", error));
    }, []);

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
                        <strong className="admin-stat-value">{stats.totalUsers}</strong>
                    </div>

                    <div className="admin-stat-icon purple">
                        👤
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">TOTAL SKILLS</span>
                        <strong className="admin-stat-value">{stats.totalSkills}</strong>
                    </div>

                    <div className="admin-stat-icon green">
                        🏆
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">TOTAL SWAP REQUESTS</span>
                        <strong className="admin-stat-value">{stats.totalSwapRequests}</strong>
                    </div>

                    <div className="admin-stat-icon yellow">
                        ↔
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">ACTIVE SESSIONS</span>
                        <strong className="admin-stat-value">{stats.activeSessions}</strong>
                    </div>

                    <div className="admin-stat-icon blue">
                        ▣
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">COMPLETED SESSIONS</span>
                        <strong className="admin-stat-value">{stats.completedSessions}</strong>
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

                            <strong>{stats.totalUsers}</strong>
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

                            <strong>{stats.totalSkills}</strong>
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

                            <strong>{stats.totalSwapRequests}</strong>
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

                            <strong>{stats.activeSessions}</strong>
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

                            <strong>{stats.completedSessions}</strong>
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

                        <Link to="/admin/swap-requests" className="admin-action">
                            <span className="admin-action-icon yellow">↔</span>
                            <div>
                                <strong>Swap Requests</strong>
                                <span>Review all requests</span>
                            </div>
                            <span className="admin-action-arrow">→</span>
                        </Link>

                        <Link to="/admin/sessions" className="admin-action">
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
