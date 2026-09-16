import SkillCard from "./SkillCard";
import "../../App.css";

function SkillList({ skills, onRequestSwap }) {
    if (!skills || skills.length === 0) {
        return (
            <div className="skill-list-empty">
                <p>No skills found.</p>
            </div>
        );
    }

    return (
        <div className="discover-grid">
            {skills.map((skill) => (
                <SkillCard
                    key={`${skill.userId}-${skill.name}-${skill.type}`}
                    skill={skill}
                    onRequestSwap={onRequestSwap}
                />
            ))}
        </div>
    );
}

export default SkillList;