import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdPeople,
    MdEmojiEvents,
    MdSwapHoriz,
    MdEvent,
    MdNotifications,
    MdSettings,
    MdPerson,
    MdSearch,
    MdMessage,
    MdLogout
} from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { AuthContext } from "../../context/AuthContext";
import { getUserDashboard } from "../../services/dashboardService";
import "../../App.css";

function Sidebar() {
    const {
        user,
        logout,
        unreadMessages,
        setUnreadMessages
    } = useContext(AuthContext);




    useEffect(() => {
        if (!user?.id || user.role !== "USER") return;

        const loadUnreadMessages = () => {
            getUserDashboard(user.id)
                .then((data) => {
                    setUnreadMessages(data.unreadMessages || 0);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        loadUnreadMessages();

        const interval = setInterval(() => {
            loadUnreadMessages();
        }, 3000);

        return () => clearInterval(interval);
    }, [user, setUnreadMessages]);





    if (!user) {
        return null;
    }

    const dashboardPath = user.role === "ADMIN" ? "/admin" : "/dashboard";

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
                    <li>
                        <NavLink to={dashboardPath} end>
                            <MdDashboard />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    {user.role === "ADMIN" ? (
                        <>
                            <li>
                                <NavLink to="/admin/users">
                                    <MdPeople />
                                    <span>Users</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/skills">
                                    <MdEmojiEvents />
                                    <span>Skills</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/swap-requests">
                                    <MdSwapHoriz />
                                    <span>Swap Requests</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/sessions">
                                    <MdEvent />
                                    <span>Sessions</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/admin/notifications">
                                    <MdNotifications />
                                    <span>Notifications</span>
                                </NavLink>
                            </li>
                       
                            <li>
                                <NavLink to="/admin/profile">
                                    <MdPerson />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>
                         

                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="profile">
                                    <MdPerson />
                                    <span>My Profile</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="skills">
                                    <MdEmojiEvents />
                                    <span>My Skills</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="discover">
                                    <MdSearch />
                                    <span>Discover Skills</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="swap-requests">
                                    <MdSwapHoriz />
                                    <span>Swap Requests</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="sessions">
                                    <MdEvent />
                                    <span>Sessions</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="messages">
                                    <MdMessage />
                                    <span>Messages</span>

                                    {unreadMessages > 0 && (
                                        <span className="badge">
                                            {unreadMessages}
                                        </span>
                                    )}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="notifications">
                                    <MdNotifications />
                                    <span>Notifications</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">
                        {user.photo ? (
                            <img
                                src={user.photo}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                        ) : (
                            user.firstName?.charAt(0)
                        )}
                    </div>

                    <div className="user-details">
                        <span className="user-name">
                            {user.firstName} {user.lastName}
                        </span>

                        <span className="user-email">
                            {user.email}
                        </span>
                    </div>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <MdLogout />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;