
import { Link } from "react-router-dom";
import "../App.css";

function MySkills() {
    const skills = [
        {
            id: 1,
            name: "React Development",
            category: "Technology",
            type: "OFFER",
            level: "Advanced"
        },
        {
            id: 2,
            name: "Node.js & APIs",
            category: "Technology",
            type: "OFFER",
            level: "Advanced"
        },
        {
            id: 3,
            name: "TypeScript",
            category: "Technology",
            type: "OFFER",
            level: "Intermediate"
        },
        {
            id: 4,
            name: "Photography",
            category: "Design",
            type: "WANTED",
            level: ""
        },
        {
            id: 5,
            name: "Spanish",
            category: "Language",
            type: "WANTED",
            level: ""
        }
    ];

    const offeredSkills = skills.filter(
        (skill) => skill.type === "OFFER"
    );

    const wantedSkills = skills.filter(
        (skill) => skill.type === "WANTED"
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

                <Link
                    to="/skills/add"
                    className="add-skill-btn"
                >
                    + Add Skill
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

                        {offeredSkills.map((skill) => (
                            <div
                                className="skill-detail-item"
                                key={skill.id}
                            >
                                <div className="skill-detail-icon purple">
                                    ★
                                </div>

                                <div className="skill-detail-info">
                                    <h4>{skill.name}</h4>
                                    <span>{skill.category}</span>
                                </div>

                                <div className="skill-detail-right">
                                    <span className="skill-level green">
                                        {skill.level}
                                    </span>

                                    <button className="skill-more-btn">
                                        ⋮
                                    </button>
                                </div>
                            </div>
                        ))}

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

                        {wantedSkills.map((skill) => (
                            <div
                                className="skill-detail-item"
                                key={skill.id}
                            >
                                <div className="skill-detail-icon yellow">
                                    ★
                                </div>

                                <div className="skill-detail-info">
                                    <h4>{skill.name}</h4>
                                    <span>{skill.category}</span>
                                </div>

                                <div className="skill-detail-right">
                                    <span className="skill-level blue">
                                        Wanted
                                    </span>

                                    <button className="skill-more-btn">
                                        ⋮
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

            <div className="skills-info-card">

                <div className="skills-info-icon">
                    💡
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

