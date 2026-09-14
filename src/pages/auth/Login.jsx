import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function Login() {
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login:", formData);

        navigate("/dashboard");
    };

    return (
        <div className="login-page">

            {/* LEFT SIDE */}
            <div className="login-left">

                <div className="login-logo">
                    <div className="login-logo-icon">
                        ↔
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


            {/* RIGHT SIDE */}
            <div className="login-right">

                <div className="login-form-container">

                    <div className="login-header">
                        <h2>Welcome back</h2>

                        <p>
                            Sign in to your SkillSwap account.
                        </p>
                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

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


                        <div className="login-actions">

                            <Link
                                to="/"
                                className="login-back-btn"
                            >
                                ← Back
                            </Link>

                            <button
                                type="submit"
                                className="login-btn"
                            >
                                Login →
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