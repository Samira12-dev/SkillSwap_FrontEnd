import { Link } from "react-router-dom";
import "../../App.css";

function SkillCard({ skill, onRequestSwap }) {
    return (
        <div className="discover-card">

            <div className="user-card-header">

                <div className="user-main-info">

                    <img
                        src={skill.avatar}
                        alt={skill.user}
                        className="avatar-large"
                    />

                    <div>
                        <h3>{skill.user}</h3>

                        <p className="location">
                            📍 {skill.city}
                        </p>

                        <div className="rating-stars">
                            <span className="stars">
                                ★★★★★
                            </span>

                            <span className="rating-val">
                                {skill.rating}
                            </span>

                            <span className="rating-count">
                                ({skill.reviews})
                            </span>
                        </div>
                    </div>

                </div>

                <div className="sessions-badge">
                    <span className="count">
                        {skill.sessions}
                    </span>

                    <span className="label">
                        sessions
                    </span>
                </div>

            </div>

            <p className="bio-snippet">
                {skill.bio}
            </p>

            <div className="skills-section">

                <span className="section-label">
                    OFFERING
                </span>

                {skill.offering.map((item, index) => (
                    <div className="skill-item" key={index}>
                        <span className="skill-name">
                            {item.name}
                        </span>

                        <span className="tag-pill green">
                            {item.level}
                        </span>
                    </div>
                ))}

            </div>

            <div className="skills-section">

                <span className="section-label">
                    WANTS TO LEARN
                </span>

                <div className="tags-row">
                    {skill.wanted.map((item, index) => (
                        <span
                            className="tag-pill blue"
                            key={index}
                        >
                            {item}
                        </span>
                    ))}
                </div>

            </div>

            <div className="discover-card-actions">

                <Link
                    to={`/skills/${skill.id}`}
                    className="link-btn"
                >
                    View Profile
                </Link>

                <button
                    className="btn-sm purple"
                    onClick={() => onRequestSwap(skill)}
                >
                    Request Swap
                </button>

            </div>

        </div>
    );
}

export default SkillCard;