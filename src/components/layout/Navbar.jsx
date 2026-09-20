import React, { useContext } from "react";
import { MdNotifications } from "react-icons/md";
import "../../App.css";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
    const { user } = useContext(AuthContext)
    return (
        <header className="dashboard-navbar">
            <div className="navbar-left">
                <span className="brand-sub">SKILLSWAP</span>
                <h1 className="page-title">Dashboard</h1>
            </div>

            <div className="navbar-right">
                {/* <div className="search-box">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        placeholder="Search skills..."
                    />
                </div> */}

                {/* <button className="icon-btn">
                    <MdNotifications />
                    <span className="notification-dot"></span>
                </button> */}

                <div className="profile-avatar">
                    <img
                        src={user?.photo}
                        alt="Profile"
                    />
                </div>
                <span>
                    {user?.firstName} {user?.lastName}
                </span>
            </div>
        </header>
    );
}

export default Navbar;

