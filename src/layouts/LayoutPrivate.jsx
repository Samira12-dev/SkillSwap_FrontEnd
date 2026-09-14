
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function LayoutPrivate() {
    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <Navbar />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

