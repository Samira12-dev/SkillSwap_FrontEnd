import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function EditProfile() {
    const [formData, setFormData] = useState({
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex@skillswap.com",
        city: "San Francisco, CA",
        bio: "Full-stack developer with a passion for building products. I love learning new creative skills and meeting people from different backgrounds."
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Updated profile:", formData);
    };

    return (
        <div className="edit-profile-page">

            <div className="edit-profile-header">
                <div>
                    <h2>Edit Profile</h2>
                    <p>Update your personal information and public profile.</p>
                </div>

                <Link to="/profile" className="cancel-btn">
                    Cancel
                </Link>
            </div>

            <form
                className="edit-profile-form"
                onSubmit={handleSubmit}
            >

                <div className="edit-profile-layout">

                    <div className="edit-profile-main">

                        <div className="edit-profile-card">

                            <h3>Personal Information</h3>

                            <div className="edit-form-grid">

                                <div className="edit-form-group">
                                    <label>
                                        First name <span className="required">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group">
                                    <label>
                                        Last name <span className="required">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>
                                        Email <span className="required">*</span>
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>
                                        City <span className="required">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="edit-form-group full-width">
                                    <label>Bio</label>

                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell people a little about yourself..."
                                    />
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="edit-profile-side">

                        <div className="edit-profile-card">

                            <h3>Profile Photo</h3>

                            <div className="edit-photo-box">
                                <img
                                    src="https://i.pravatar.cc/150?img=12"
                                    alt="Profile"
                                />

                                <button
                                    type="button"
                                    className="change-photo-btn"
                                >
                                    Change photo
                                </button>

                                <p>JPG, PNG or WEBP. Max 5MB.</p>
                            </div>

                        </div>

                        <div className="edit-profile-card">

                            <h3>Account</h3>

                            <div className="account-info">
                                <span>Member since</span>
                                <strong>March 2024</strong>
                            </div>

                            <div className="account-info">
                                <span>Account type</span>
                                <strong>USER</strong>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="edit-profile-actions">

                    <Link to="/profile" className="cancel-btn">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="save-profile-btn"
                    >
                        Save changes
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditProfile;

