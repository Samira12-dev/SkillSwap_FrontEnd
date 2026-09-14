import React from "react";
import "../../App.css";

function Navbar() {
    return (
          <header className="dashboard-navbar">
            <div className="navbar-left">
                <span className="brand-sub">SKILLSWAP</span>
                <h1 className="page-title">Dashboard</h1>
            </div>

            <div className="navbar-right">
                <div className="search-box">
                    <span className="search-icon">⌕</span>

                    <input
                        type="text"
                        placeholder="Search skills..."
                    />
                </div>

                <button className="icon-btn">
                    🔔
                    <span className="notification-dot"></span>
                </button>

                <div className="profile-avatar">
                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="Profile"
                    />
                </div>
            </div>
        </header>
    );
}

export default Navbar;

