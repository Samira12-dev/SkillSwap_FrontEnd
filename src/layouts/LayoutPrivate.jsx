import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function LayoutPrivate() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!sidebarOpen) return undefined;

        const handleEscape = (event) => {
            if (event.key === "Escape") setSidebarOpen(false);
        };

        document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [sidebarOpen]);

    return (
        <div className="layout">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Close navigation menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="content">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
