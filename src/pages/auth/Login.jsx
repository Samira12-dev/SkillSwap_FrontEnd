
import { MdSwapHoriz, MdArrowBack, MdArrowForward } from "react-icons/md";
import "../../App.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { getErrorMessage } from "../../utils/format";
    

function Login() {
    const navigate = useNavigate();
    const { login: authLogin } = useContext(AuthContext);
    const toast = useToast();

    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setSubmitting(true);

        try {
            const data = await login(formData);

            authLogin(data.token);

            const decodedToken = jwtDecode(data.token);

            toast.success("Welcome back.");
            navigate(decodedToken.role === "ADMIN" ? "/admin" : "/dashboard");
        } catch (error) {
            const message = getErrorMessage(
                error,
                "We could not sign you in. Check your email and password."
            );

            setFormError(message);
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-logo">
                    <div className="login-logo-icon">
                        <MdSwapHoriz />
                    </div>
                    SkillSwap
                </div>

                <div className="login-left-content">
                    <h1>
                        Exchange skills.
                        <br />
                        Grow together.
                    </h1>

                    <p>
                        Learn something new, share what you know,
                        and connect with people who are ready to
                        exchange skills.
                    </p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <div className="login-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to your SkillSwap account.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {formError && (
                            <p className="form-error" role="alert">
                                {formError}
                            </p>
                        )}

                        <div className="login-actions">
                            <Link to="/" className="login-back-btn">
                                <MdArrowBack />
                                Back
                            </Link>

                            <button type="submit" className="login-btn" disabled={submitting}>
                                {submitting ? "Signing in…" : "Login"}
                                <MdArrowForward />
                            </button>
                        </div>
                    </form>

                    <p className="login-register">
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

