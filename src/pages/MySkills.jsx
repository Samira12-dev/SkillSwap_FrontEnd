import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
    MdStar,
    MdEdit,
    MdDelete,
    MdLightbulb,
    MdAdd
} from "react-icons/md";
import { getUserSkills, updateUserSkill, removeSkillFromUser } from "../services/skillService";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

function MySkills() {

    const { user } = useContext(AuthContext);

    const [skills, setSkills] = useState([]);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [editLevel, setEditLevel] = useState("BEGINNER");

    const loadSkills = () => {
        if (!user) {
            return;
        }

        getUserSkills(user.id)
            .then((data) => {
                setSkills(data.content || []);
            })
            .catch((error) => {
                console.error("Error loading skills:", error);
            });
    };

    useEffect(() => {
        loadSkills();
    }, [user]);

    const offeredSkills = skills.filter(
        (skill) => skill.type === "OFFER"
    );

    const wantedSkills = skills.filter(
        (skill) => skill.type === "WANTED"
    );

    const startEdit = (skill) => {
        setEditingSkillId(skill.id);
        setEditLevel(skill.level);
    };

    const cancelEdit = () => {
        setEditingSkillId(null);
    };

    const saveEdit = async (skill) => {
        try {
            await updateUserSkill(user.id, skill.skillId, {
                skillId: skill.skillId,
                type: skill.type,
                level: editLevel
            });

            setEditingSkillId(null);
            loadSkills();
        } catch (error) {
            console.error("Error updating skill:", error);
        }
    };

    const deleteSkill = async (skill) => {
        try {
            await removeSkillFromUser(user.id, skill.skillId);
            setSkills((prev) => prev.filter((item) => item.id !== skill.id));
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    const renderSkillItem = (skill, iconClass) => (
        <div className="skill-detail-item" key={skill.id}>
            <div className={`skill-detail-icon ${iconClass}`}>
                <MdStar />
            </div>

            <div className="skill-detail-info">
                <h4>{skill.skillName}</h4>
                <span>{skill.category}</span>
            </div>

            {editingSkillId === skill.id ? (
                <div className="skill-detail-right">
                    <select
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value)}
                    >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                    </select>

                    <button
                        className="skill-more-btn"
                        onClick={() => saveEdit(skill)}
                    >
                        Save
                    </button>

                    <button className="skill-more-btn" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="skill-detail-right">
                    <span className="skill-level green">
                        {skill.level}
                    </span>

                    <button
                        className="skill-more-btn"
                        onClick={() => startEdit(skill)}
                        title="Edit level"
                    >
                        <MdEdit />
                    </button>

                    <button
                        className="skill-more-btn"
                        onClick={() => deleteSkill(skill)}
                        title="Delete skill"
                    >
                        <MdDelete />
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <div className="my-skills-page">
            <div className="my-skills-header">
                <div>
                    <h2>My Skills</h2>
                    <p>
                        Manage the skills you can offer and the skills you
                        want to learn.
                    </p>
                </div>

                <Link to="/skills/add" className="add-skill-btn">
                    <MdAdd />
                    Add Skill
                </Link>
            </div>

            <div className="skills-summary">
                <div className="skills-summary-card">
                    <span className="skills-summary-label">
                        TOTAL SKILLS
                    </span>
                    <strong>{skills.length}</strong>
                    <span className="skills-summary-text">
                        Your current skills
                    </span>
                </div>

                <div className="skills-summary-card">
                    <span className="skills-summary-label">
                        OFFERING
                    </span>
                    <strong>{offeredSkills.length}</strong>
                    <span className="skills-summary-text">
                        Skills you can teach
                    </span>
                </div>

                <div className="skills-summary-card">
                    <span className="skills-summary-label">
                        WANTED
                    </span>
                    <strong>{wantedSkills.length}</strong>
                    <span className="skills-summary-text">
                        Skills you want to learn
                    </span>
                </div>
            </div>

            <div className="skills-grid">
                <div className="skills-card">
                    <div className="skills-card-header">
                        <div>
                            <span className="skills-type-label offer-label">
                                I CAN OFFER
                            </span>
                            <h3>Skills I can teach</h3>
                        </div>

                        <span className="skills-count">
                            {offeredSkills.length} skills
                        </span>
                    </div>

                    <div className="skill-list">
                        {offeredSkills.map((skill) =>
                            renderSkillItem(skill, "purple")
                        )}
                    </div>
                </div>

                <div className="skills-card">
                    <div className="skills-card-header">
                        <div>
                            <span className="skills-type-label wanted-label">
                                I WANT TO LEARN
                            </span>
                            <h3>Skills I want to learn</h3>
                        </div>

                        <span className="skills-count">
                            {wantedSkills.length} skills
                        </span>
                    </div>

                    <div className="skill-list">
                        {wantedSkills.map((skill) =>
                            renderSkillItem(skill, "yellow")
                        )}
                    </div>
                </div>
            </div>

            <div className="skills-info-card">
                <div className="skills-info-icon">
                    <MdLightbulb />
                </div>

                <div>
                    <h3>Grow your SkillSwap profile</h3>
                    <p>
                        Add more skills you can offer and skills you want to
                        learn to increase your chances of finding the perfect
                        skill exchange.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MySkills;
