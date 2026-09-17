
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    MdArrowBack,
    MdLocationOn,
    MdStar,
    MdEmail,
    MdSchool
} from "react-icons/md";
import { getUserById } from "../services/userService";
import { getUserProfileSkills } from "../services/skillService";
import "../App.css";

function UserProfile() {
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const userData = await getUserById(userId);
                setUser(userData);

                const skillsData = await getUserProfileSkills(userId);
                setSkills(skillsData?.content || []);
            } catch (error) {
                console.error("USER PROFILE ERROR:", error);
                console.error("STATUS:", error.response?.status);
                console.error("DATA:", error.response?.data);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [userId]);

    if (loading) {
        return <div className="user-profile-loading">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="user-profile-empty">
                <p>User not found.</p>
                <Link to="/discover">Back to Discover</Link>
            </div>
        );
    }

    const offeredSkills = skills.filter(
        (skill) => String(skill.type).toUpperCase() === "OFFER"
    );

    const wantedSkills = skills.filter(
        (skill) => String(skill.type).toUpperCase() === "WANTED"
    );

    return (
        <div className="user-profile-page">
            <Link to="/discover" className="back-link">
                <MdArrowBack />
                Back to Discover
            </Link>

            <div className="user-profile-card">
                <div className="user-profile-header">
                    <div className="user-profile-avatar">
                        {user.photo ? (
                            <img
                                src={user.photo}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                        ) : (
                            user.firstName?.charAt(0)
                        )}
                    </div>

                    <div className="user-profile-info">
                        <h2>
                            {user.firstName} {user.lastName}
                        </h2>

                        <p className="user-profile-city">
                            <MdLocationOn />
                            {user.city || "No city"}
                        </p>

                        <div className="user-profile-rating">
                            <MdStar />
                            <span>{user.rating ?? "0.0"}</span>
                        </div>
                    </div>
                </div>

                <div className="user-profile-section">
                    <h3>About</h3>
                    <p>
                        {user.bio?.trim()
                            ? user.bio
                            : "This user has not added a bio yet."}
                    </p>
                </div>

                <div className="user-profile-section">
                    <h3>Contact & Information</h3>

                    <div className="user-profile-details">
                        <div>
                            <span>Email</span>
                            <p>
                                <MdEmail />
                                {user.email || "-"}
                            </p>
                        </div>

                        <div>
                            <span>Member since</span>
                            <p>
                                <MdSchool />
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="user-profile-section">
                    <h3>Skills Offered</h3>

                    {offeredSkills.length === 0 ? (
                        <p>No skills offered.</p>
                    ) : (
                        <div className="profile-skills-list">
                            {offeredSkills.map((skill) => (
                                <div
                                    className="profile-skill-item"
                                    key={skill.id}
                                >
                                    <div>
                                        <span className="profile-skill-name">
                                            {skill.skillName}
                                        </span>

                                        <span className="profile-skill-category">
                                            {skill.category}
                                        </span>
                                    </div>

                                    <span className="profile-skill-level">
                                        {skill.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="user-profile-section">
                    <h3>Skills Wanted</h3>

                    {wantedSkills.length === 0 ? (
                        <p>No skills wanted.</p>
                    ) : (
                        <div className="profile-skills-list">
                            {wantedSkills.map((skill) => (
                                <div
                                    className="profile-skill-item"
                                    key={skill.id}
                                >
                                    <div>
                                        <span className="profile-skill-name">
                                            {skill.skillName}
                                        </span>

                                        <span className="profile-skill-category">
                                            {skill.category}
                                        </span>
                                    </div>

                                    <span className="profile-skill-level">
                                        {skill.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;

