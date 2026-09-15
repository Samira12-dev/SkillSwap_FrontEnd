
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import {register}from "../../services/authService"

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        city: "",
        bio: "",
        category: "",
        offerSkill: "",
        learnSkill: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await register(formData);
        setFormData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            city: formData.city,
            bio: formData.bio,
            category: formData.category,
            offerSkill: formData.offerSkill,
            learnSkill: formData.learnSkill
        });
        navigate("/login");
    };

    return (
        <div className="register-page">

            {/* LEFT SIDE */}
            <div className="register-left">

                <div className="register-logo">
                    <div className="register-logo-icon">
                        ↔
                    </div>
                    SkillSwap
                </div>

                <div className="register-left-content">
                    <h1>
                        Join people
                        <br />
                        exchanging skills.
                    </h1>

                    <p>
                        Learn new skills, share your knowledge,
                        and build meaningful connections through
                        SkillSwap.
                    </p>
                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="register-right">

                <div className="register-form-container">

                    <div className="register-header">
                        <h1>Create your account</h1>

                        <p>
                            Join SkillSwap and start exchanging skills.
                        </p>
                    </div>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        {/* ACCOUNT */}

                        <h2>Account information</h2>

                        <div className="form-row">

                            <div className="form-group">
                                <label>
                                    First name <span className="required">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Last name <span className="required">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>
                                Email <span className="required">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>
                                    Password <span className="required">*</span>
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="At least 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                        </div>

                        {/* PROFILE */}

                        <h2>Profile</h2>

                        <div className="form-group">
                            <label>
                                City <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                name="city"
                                placeholder="Beni Mellal"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Short bio</label>

                            <textarea
                                name="bio"
                                placeholder="Tell us a little about yourself..."
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>

                        {/* SKILLS */}

                        <h2>Your skills</h2>

                        <div className="form-group">
                            <label>
                                Category <span className="required">*</span>
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select a category
                                </option>

                                <option value="Technology">Technology</option>
                                <option value="Language">Language</option>
                                <option value="Design">Design</option>
                                <option value="Music">Music</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Skill I can offer <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                name="offerSkill"
                                placeholder="Example: React"
                                value={formData.offerSkill}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Skill I want to learn <span className="required">*</span>
                            </label>

                            <input
                                type="text"
                                name="learnSkill"
                                placeholder="Example: Photography"
                                value={formData.learnSkill}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* BUTTONS */}

                        <div className="register-actions">

                            <Link
                                to="/"
                                className="register-back-btn"
                            >
                                ← Back
                            </Link>

                            <button
                                type="submit"
                                className="register-btn"
                            >
                                Create account →
                            </button>

                        </div>

                    </form>

                    <p className="register-login">
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;
