import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function Sidebar() {
    const role = localStorage.getItem("role");

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">↔</span>
                    <span className="logo-text">SkillSwap</span>
                </div>
            </div>

            <nav className="sidebar-menu">
                <ul>
                    <li className="active">
                        <Link to="/dashboard">
                            <span>▦</span>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {role === "ADMIN" ? (
                        <>
                            <li>
                                <Link to="/users">
                                    <span>👤</span>
                                    <span>Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/skills">
                                    <span>🏆</span>
                                    <span>Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/swap-requests">
                                    <span>↔</span>
                                    <span>Swap Requests</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/sessions">
                                    <span>▣</span>
                                    <span>Sessions</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/notifications">
                                    <span>🔔</span>
                                    <span>Notifications</span>
                                    <span className="badge">3</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/settings">
                                    <span>⚙</span>
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile">
                                    <span>👤</span>
                                    <span>My Profile</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/skills">
                                    <span>🏆</span>
                                    <span>My Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/discover">
                                    <span>⌕</span>
                                    <span>Discover Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/swap-requests">
                                    <span>↔</span>
                                    <span>Swap Requests</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/sessions">
                                    <span>▣</span>
                                    <span>Sessions</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/messages">
                                    <span>💬</span>
                                    <span>Messages</span>
                                    <span className="badge">2</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/notifications">
                                    <span>🔔</span>
                                    <span>Notifications</span>
                                    <span className="badge">3</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/settings">
                                    <span>⚙</span>
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="User Avatar"
                        className="user-avatar"
                    />

                    <div className="user-details">
                        <span className="user-name">Alex Johnson</span>
                        <span className="user-email">
                            alex@skillswap.com
                        </span>
                    </div>
                </div>

                <Link to="/logout" className="logout-btn">
                    <span>↪</span>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;