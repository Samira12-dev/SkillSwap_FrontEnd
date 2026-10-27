import { useContext, useEffect, useState } from "react";
import { ArrowLeftRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
    { label: "How it works", to: "/#how-it-works" },
    { label: "Benefits", to: "/#benefits" }
];

export default function Header() {
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        document.addEventListener("keydown", closeOnEscape);

        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    const dashboardPath = user?.role === "ADMIN" ? "/admin" : "/dashboard";

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link to="/" className="site-brand" aria-label="SkillSwap home">
                    <span className="site-brand-mark" aria-hidden="true">
                        <ArrowLeftRight size={18} />
                    </span>
                    SkillSwap
                </Link>

                <nav className="site-nav" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <Link key={item.to} to={item.to}>{item.label}</Link>
                    ))}
                </nav>

                <div className="site-actions">
                    {user ? (
                        <Link to={dashboardPath} className="btn btn-primary btn-sm">
                            Go to dashboard
                        </Link>
                    ) : (
                        <>
                            <NavLink to="/login" className="btn btn-ghost btn-sm">Sign in</NavLink>
                            <NavLink to="/register" className="btn btn-primary btn-sm">Create account</NavLink>
                        </>
                    )}
                    <button
                        type="button"
                        className="mobile-menu-button"
                        aria-expanded={menuOpen}
                        aria-controls="site-mobile-menu"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav id="site-mobile-menu" className="site-mobile-menu" aria-label="Mobile navigation">
                    {navItems.map((item) => (
                        <Link key={item.to} to={item.to}>{item.label}</Link>
                    ))}
                    {user ? (
                        <Link to={dashboardPath} className="btn btn-primary">Go to dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login">Sign in</Link>
                            <Link to="/register" className="btn btn-primary">Create account</Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}
