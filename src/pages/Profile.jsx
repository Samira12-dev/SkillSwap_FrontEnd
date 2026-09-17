
import { Link } from "react-router-dom";
import { MdEdit, MdLocationOn, MdCalendarToday, MdStar } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function MyProfile() {
    const { user } = useContext(AuthContext);
 console.log("USER:", user);
    return (
        <div className="profile-page">
            <div className="profile-header">
                <div>
                    <h2>My Profile</h2>
                    <p>Manage your public profile and personal information</p>
                </div>

                <Link to="/profile/edit" className="btn-edit-profile">
                    <MdEdit />
                    Edit Profile
                </Link>
            </div>

            <div className="profile-grid">
                <div className="left-col">
                    <div className="card user-summary-card">
                        <div className="profile-img-box">
                            <img
                                src={user?.photo || "https://i.pravatar.cc/120?img=12"}
                                alt="Profile"
                            />
                        </div>

                        <h3>
                            {user?.firstName} {user?.lastName}
                        </h3>

                        <p className="location">
                            <MdLocationOn />
                            {user?.city || "No city"}
                        </p>

                        <div className="profile-rating">
                            <MdStar />
                            <span>{user?.rating ?? 0}</span>
                        </div>

                        <div className="member-since">
                            <MdCalendarToday />
                            <span>
                                Member since{" "}
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : "N/A"}
                            </span>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>My Skills</h3>

                            <Link to="/skills" className="link-btn">
                                Manage
                            </Link>
                        </div>

                        <p>Manage your skills from the Skills page.</p>
                    </div>
                </div>

                <div className="right-col">
                    <div className="card">
                        <h3>Personal Information</h3>

                        <div className="info-grid">
                            <div className="info-item">
                                <label>FIRST NAME</label>
                                <p>{user?.firstName || "N/A"}</p>
                            </div>

                            <div className="info-item">
                                <label>LAST NAME</label>
                                <p>{user?.lastName || "N/A"}</p>
                            </div>

                            <div className="info-item full-width">
                                <label>EMAIL</label>
                                <p>{user?.email || "N/A"}</p>
                            </div>

                            <div className="info-item full-width">
                                <label>CITY</label>
                                <p className="info-with-icon">
                                    <MdLocationOn />
                                    {user?.city || "N/A"}
                                </p>
                            </div>

                            <div className="info-item full-width">
                                <label>BIO</label>
                                <p>{user?.bio || "No bio available"}</p>
                            </div>

                            <div className="info-item full-width">
                                <label>ROLE</label>
                                <p>{user?.role || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;

