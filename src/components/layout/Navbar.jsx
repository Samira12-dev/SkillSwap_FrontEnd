import { useContext, useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu, Search, Settings, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import "../../App.css";

const getPageTitle = (pathname) => {
    if (pathname === "/dashboard" || pathname === "/admin") return "Dashboard";
    if (pathname === "/profile" || pathname === "/admin/profile") return "My profile";
    if (pathname === "/profile/edit" || pathname === "/admin/profile/edit") return "Edit profile";
    if (pathname === "/skills") return "My skills";
    if (pathname === "/skills/add") return "Add a skill";
    if (pathname.startsWith("/discover")) return "Discover skills";
    if (pathname.startsWith("/swap-requests") || pathname.startsWith("/admin/swap-requests")) {
        return "Swap requests";
    }
    if (pathname.startsWith("/sessions")) return "Sessions";
    if (pathname.startsWith("/messages")) return "Messages";
    if (pathname.startsWith("/notifications") || pathname.startsWith("/admin/notifications")) {
        return "Notifications";
    }
    if (pathname.startsWith("/admin/users")) return "Users";
    if (pathname.startsWith("/admin/skills")) return "Skills";
    if (pathname.startsWith("/profile/") || pathname.startsWith("/admin/profile/")) return "Profile";

    return "SkillSwap";
};

export default function Navbar({ onMenuClick }) {
    const { user, logout, unreadMessages } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setProfileOpen(false);
        setSearch("");
    }, [location.pathname]);

    useEffect(() => {
        if (!profileOpen) return undefined;

        const handlePointerDown = (event) => {
            if (!profileRef.current?.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") setProfileOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [profileOpen]);

    const handleSearch = (event) => {
        event.preventDefault();
        const query = search.trim();

        navigate(query ? `/discover?q=${encodeURIComponent(query)}` : "/discover");
    };

    const profilePath = user?.role === "ADMIN" ? "/admin/profile" : "/profile";
    const settingsPath = user?.role === "ADMIN" ? "/admin/profile/edit" : "/profile/edit";
    const title = getPageTitle(location.pathname);

    return (
        <header className="dashboard-navbar">
            <div className="navbar-left">
                <button
                    type="button"
                    className="navbar-mobile-toggle"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    <Menu size={19} />
                </button>
                <div className="navbar-heading">
                    <span className="brand-sub">SKILLSWAP</span>
                    <h1 className="page-title">{title}</h1>
                </div>
            </div>

            <div className="navbar-right">
                <form className="navbar-search" role="search" onSubmit={handleSearch}>
                    <Search size={16} className="navbar-search-icon" aria-hidden="true" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search skills…"
                        aria-label="Search skills"
                    />
                </form>

                <Link
                    to={user?.role === "ADMIN" ? "/admin/notifications" : "/notifications"}
                    className="icon-btn"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    {unreadMessages > 0 && <span className="notification-dot" />}
                </Link>

                <div className="navbar-profile" ref={profileRef}>
                    <button
                        type="button"
                        className="navbar-profile-button"
                        onClick={() => setProfileOpen((open) => !open)}
                        aria-haspopup="menu"
                        aria-expanded={profileOpen}
                        aria-label="Open account menu"
                    >
                        <Avatar user={user} size="sm" />
                        <span className="profile-name">{user?.firstName}</span>
                    </button>

                    {profileOpen && (
                        <div className="navbar-dropdown" role="menu">
                            <Link to={profilePath} role="menuitem">
                                <UserRound size={15} />
                                My profile
                            </Link>
                            <Link to={settingsPath} role="menuitem">
                                <Settings size={15} />
                                Account settings
                            </Link>
                            <hr />
                            <button type="button" className="is-danger" onClick={logout} role="menuitem">
                                <LogOut size={15} />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
