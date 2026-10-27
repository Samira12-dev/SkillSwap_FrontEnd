import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function LayoutPublic() {
    const location = useLocation();
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    useEffect(() => {
        if (!location.hash) return undefined;

        const frame = window.requestAnimationFrame(() => {
            const target = document.querySelector(location.hash);

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        return () => window.cancelAnimationFrame(frame);
    }, [location.hash, location.pathname]);

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="public-shell">
            <Header />
            <main className="public-main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
