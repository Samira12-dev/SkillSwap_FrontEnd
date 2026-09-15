import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { login } from "../../services/authService";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(formData);

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information
            const user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                city: data.city,
                photo: data.photo,
                role: data.role
            };

            localStorage.setItem("user", JSON.stringify(user));

            console.log("Login successful:", data);

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setError(
                    error.response.data?.message ||
                    "Email or password is incorrect"
                );
            } else {
                setError("Unable to connect to the server");
            }
        }
    };

    return (
        <div className="login-page">

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

                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}

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