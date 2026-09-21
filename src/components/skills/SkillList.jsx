
import SkillCard from "./SkillCard";

function SkillList({ users, onRequestSwap }) {
    if (!users || users.length === 0) {
        return (
            <div className="empty-state">
                <p>No skills found.</p>
            </div>
        );
    }

    return (
        <div className="skills-grid">
            {users.map((user) => (
                <SkillCard
                    key={user.userId}
                    user={user}
                    onRequestSwap={onRequestSwap}
                />
            ))}
        </div>
    );
}

export default SkillList;