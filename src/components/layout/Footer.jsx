import { ArrowLeftRight } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Footer() {
    const { user } = useContext(AuthContext);
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-brand">
                    <Link to="/" className="site-brand">
                        <span className="site-brand-mark" aria-hidden="true">
                            <ArrowLeftRight size={18} />
                        </span>
                        SkillSwap
                    </Link>
                    <p>
                        A focused platform for exchanging skills, scheduling
                        sessions, and learning directly from other people.
                    </p>
                </div>

                <div className="site-footer-column">
                    <h3>Platform</h3>
                    <Link to="/#how-it-works">How it works</Link>
                    <Link to="/#benefits">Benefits</Link>
                    {user && (
                        <Link to={user.role === "ADMIN" ? "/admin" : "/dashboard"}>
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="site-footer-column">
                    <h3>Account</h3>
                    {user ? (
                        <>
                            <Link to="/profile">My profile</Link>
                            <Link to="/skills">My skills</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Sign in</Link>
                            <Link to="/register">Create account</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="site-footer-bottom">
                <span>© {year} SkillSwap. Exchange skills, grow together.</span>
                <span>Built with care for people who love to learn.</span>
            </div>
        </footer>
    );
}
