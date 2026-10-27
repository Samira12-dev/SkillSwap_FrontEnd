import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    ArrowLeftRight,
    Bell,
    CalendarDays,
    Compass,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Sparkles,
    UserRound,
    Users,
    X
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDashboard } from "../../services/dashboardService";
import Avatar from "../ui/Avatar";
import "../../App.css";

export default function Sidebar({ open, onClose }) {
    const { user, logout, unreadMessages, setUnreadMessages } = useContext(AuthContext);
    const [dashboard, setDashboard] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (!user?.id || user.role !== "USER") return undefined;

        let cancelled = false;

        const loadSummary = async () => {
            try {
                const data = await getUserDashboard(user.id);

                if (!cancelled) {
                    setDashboard(data);
                    setUnreadMessages(data?.unreadMessages || 0);
                }
            } catch {
                if (!cancelled) {
                    setDashboard(null);
                }
            }
        };

        loadSummary();
        const interval = window.setInterval(loadSummary, 20000);

        return () => {
            cancelled = true;
            window.clearInterval(interval);
        };
    }, [location.pathname, setUnreadMessages, user]);

    if (!user) return null;

    const isAdmin = user.role === "ADMIN";
    const dashboardPath = isAdmin ? "/admin" : "/dashboard";
    const notificationCount = Number(dashboard?.notifications) || 0;
    const pendingCount = Number(dashboard?.pendingRequests) || 0;

    return (
        <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Main sidebar">
            <div>
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon" aria-hidden="true">
                            <ArrowLeftRight size={18} />
                        </span>
                        <span className="logo-text">SkillSwap</span>
                    </div>
                    <button
                        type="button"
                        className="sidebar-close"
                        onClick={onClose}
                        aria-label="Close navigation"
                    >
                        <X size={17} />
                    </button>
                </div>

                <nav className="sidebar-menu">
                    <p className="sidebar-section-label">Workspace</p>
                    <ul>
                        <li>
                            <NavLink to={dashboardPath} end onClick={onClose}>
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/admin/users" onClick={onClose}>
                                        <Users />
                                        <span>Users</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/skills" onClick={onClose}>
                                        <Sparkles />
                                        <span>Skills</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/swap-requests" onClick={onClose}>
                                        <ArrowLeftRight />
                                        <span>Swap requests</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/sessions" onClick={onClose}>
                                        <CalendarDays />
                                        <span>Sessions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/admin/notifications" onClick={onClose}>
                                        <Bell />
                                        <span>Notifications</span>
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/profile" onClick={onClose}>
                                        <UserRound />
                                        <span>My profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/skills" onClick={onClose}>
                                        <Sparkles />
                                        <span>My skills</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/discover" onClick={onClose}>
                                        <Compass />
                                        <span>Discover skills</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/swap-requests" onClick={onClose}>
                                        <ArrowLeftRight />
                                        <span>Swap requests</span>
                                        {pendingCount > 0 && (
                                            <span className="badge" aria-label={`${pendingCount} pending requests`}>
                                                {pendingCount}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/sessions" onClick={onClose}>
                                        <CalendarDays />
                                        <span>Sessions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/messages" onClick={onClose}>
                                        <MessageSquare />
                                        <span>Messages</span>
                                        {unreadMessages > 0 && (
                                            <span className="badge" aria-label={`${unreadMessages} unread messages`}>
                                                {unreadMessages}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/notifications" onClick={onClose}>
                                        <Bell />
                                        <span>Notifications</span>
                                        {notificationCount > 0 && (
                                            <span className="badge" aria-label={`${notificationCount} unread notifications`}>
                                                {notificationCount}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <Avatar user={user} size="sm" />
                    <div className="user-details">
                        <span className="user-name">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="user-email">{user.email}</span>
                    </div>
                </div>

                <button type="button" className="logout-btn" onClick={logout}>
                    <LogOut size={17} />
                    <span>Sign out</span>
                </button>
            </div>
        </aside>
    );
}
