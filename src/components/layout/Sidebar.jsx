
import React from "react";
import { Link } from "react-router-dom";
import {  MdDashboard,  MdPeople,  MdEmojiEvents,  MdSwapHoriz, MdEvent,  MdNotifications,   MdSettings,MdPerson, MdSearch,  MdMessage,  MdLogout} from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import "../../App.css";

function Sidebar() {
    const role = localStorage.getItem("role");

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">
                        <TbArrowsExchange />
                    </span>

                    <span className="logo-text">
                        SkillSwap
                    </span>
                </div>
            </div>

            <nav className="sidebar-menu">
                <ul>

                    <li className="active">
                        <Link to="/dashboard">
                            <MdDashboard />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {role === "ADMIN" ? (
                        <>
                            <li>
                                <Link to="/users">
                                    <MdPeople />
                                    <span>Users</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/skills">
                                    <MdEmojiEvents />
                                    <span>Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/swap-requests">
                                    <MdSwapHoriz />
                                    <span>Swap Requests</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/sessions">
                                    <MdEvent />
                                    <span>Sessions</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/notifications">
                                    <MdNotifications />
                                    <span>Notifications</span>
                                    <span className="badge">3</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/settings">
                                    <MdSettings />
                                    <span>Settings</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/profile">
                                    <MdPerson />
                                    <span>My Profile</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/skills">
                                    <MdEmojiEvents />
                                    <span>My Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/discover">
                                    <MdSearch />
                                    <span>Discover Skills</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/swap-requests">
                                    <MdSwapHoriz />
                                    <span>Swap Requests</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/sessions">
                                    <MdEvent />
                                    <span>Sessions</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/messages">
                                    <MdMessage />
                                    <span>Messages</span>
                                    <span className="badge">2</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/notifications">
                                    <MdNotifications />
                                    <span>Notifications</span>
                                    <span className="badge">3</span>
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
                        <span className="user-name">
                            Alex Johnson
                        </span>

                        <span className="user-email">
                            Samira@skillswap.com
                        </span>
                    </div>

                </div>

                <Link to="/logout" className="logout-btn">
                    <MdLogout />
                    <span>Logout</span>
                </Link>

            </div>

        </aside>
    );
}

export default Sidebar;

