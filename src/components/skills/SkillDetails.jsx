import { Link } from "react-router-dom";
import "../../App.css";

function SkillDetails({ skill, onRequestSwap }) {
    if (!skill) {
        return (
            <div className="skill-details-loading">
                <p>Loading skill details...</p>
            </div>
        );
    }

    return (
        <div className="skill-details">
            <Link to="/skills" className="link-btn">
                ← Back to Skills
            </Link>

            <div className="skill-details-card">
                <div className="skill-details-header">
                    <span className="skill-icon large">⭐</span>
                    <h1>{skill.title}</h1>
                </div>

                <div className="skill-details-meta">
                    <span className="tag blue">{skill.category || "General"}</span>
                    <span className={`tag ${skill.level === "advanced" ? "purple" : skill.level === "intermediate" ? "yellow" : "green"}`}>
                        {skill.level}
                    </span>
                </div>

                <div className="skill-details-body">
                    <h3>Description</h3>
                    <p>{skill.description}</p>
                </div>

                {skill.owner && (
                    <div className="skill-details-owner">
                        <h3>Provided by</h3>
                        <div className="owner-info">
                            <img
                                src={skill.owner.avatar || "https://i.pravatar.cc/40"}
                                alt={skill.owner.name}
                                className="owner-avatar"
                            />
                            <span>{skill.owner.name}</span>
                        </div>
                    </div>
                )}

                <div className="skill-details-actions">
                    <button
                        className="btn-sm purple"
                        onClick={() => onRequestSwap && onRequestSwap(skill)}
                    >
                        ↔ Request Swap
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SkillDetails;
