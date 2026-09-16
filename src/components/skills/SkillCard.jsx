import { Link } from "react-router-dom";
import "../../App.css";

function SkillCard({ skill, onRequestSwap }) {
    return (
        <div className="discover-card">
            <div className="user-card-header">
                <div className="user-main-info">
                    <div className="avatar-large">
                        {skill.userName?.charAt(0)}
                    </div>

                    <div>
                        <h3>{skill.userName}</h3>

                        <p className="location">
                            {skill.category}
                        </p>
                    </div>
                </div>
            </div>

            <div className="skills-section">
                <span className="section-label">
                    {skill.type === "OFFER" ? "OFFERING" : "WANTS TO LEARN"}
                </span>

                <div className="skill-item">
                    <span className="skill-name">
                        {skill.skillName}
                    </span>

                    <span className="tag-pill green">
                        {skill.level}
                    </span>
                </div>
            </div>

            <div className="discover-card-actions">
                <Link
                    to={`/skills/${skill.userId}`}
                    className="link-btn"
                >
                    View Skill
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
