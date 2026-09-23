import { Link } from "react-router-dom";

function SkillCard({ user, onRequestSwap }) {
    return (
        <div className="skill-card">

            <div className="skill-card-header">
                <Link
                    className="skill-card-profile-link"
                    to={`/profile/${user.userId}`}
                >
                    <div className="skill-avatar">
                        {user.userName?.charAt(0)}
                    </div>

                    <div>
                        <h3>{user.userName}</h3>
                        <p>{user.skills.length} skills</p>
                    </div>
                </Link>
            </div>

            <div className="skill-card-list">

                {user.skills.map((skill) => (
                    <div
                        className="skill-item"
                        key={skill.id}
                    >
                        <div className="skill-item-info">
                            <strong>
                                {skill.skillName}
                            </strong>

                            <p>
                                {skill.category}
                            </p>

                            <span className="skill-level">
                                {skill.level}
                            </span>
                        </div>

                        <button
                            className="request-skill-button"
                            onClick={() =>
                                onRequestSwap(skill)
                            }
                        >
                            Request Swap
                        </button>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default SkillCard;