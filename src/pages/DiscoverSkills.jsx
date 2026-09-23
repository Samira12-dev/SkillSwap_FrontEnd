
import { useContext, useEffect, useState } from "react";
import SkillList from "../components/skills/SkillList";
import { getDiscoverSkills, getUserSkills } from "../services/skillService";
import { createSwapRequest } from "../services/swapRequestService";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function DiscoverSkills() {
    const { user } = useContext(AuthContext);

    const [skills, setSkills] = useState([]);
    const [mySkills, setMySkills] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedOfferedSkill, setSelectedOfferedSkill] = useState("");
    const [message, setMessage] = useState("");

    const size = 9;

    useEffect(() => {
        getDiscoverSkills(currentPage, size)
            .then((data) => {
                setSkills(data.content || []);
                setTotalPages(data.totalPages || 0);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);

    useEffect(() => {
        if (!user) return;

        getUserSkills(user.id, 0, size)
            .then((data) => {
                const offeredSkills = (data.content || []).filter(
                    (skill) => skill.type === "OFFER"
                );

                setMySkills(offeredSkills);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [user]);

    const categories = [
        ...new Set(
            skills
                .map((skill) => skill.category)
                .filter(Boolean)
        )
    ];

    const levels = [
        ...new Set(
            skills
                .map((skill) => skill.level)
                .filter(Boolean)
        )
    ];

    const types = [
        ...new Set(
            skills
                .map((skill) => skill.type)
                .filter(Boolean)
        )
    ];

    const filteredSkills = skills.filter((skill) => {
        const searchValue = search.toLowerCase();

        const searchMatch =
            skill.skillName?.toLowerCase().includes(searchValue) ||
            skill.userName?.toLowerCase().includes(searchValue) ||
            skill.category?.toLowerCase().includes(searchValue);

        const categoryMatch =
            category === "" || skill.category === category;

        const levelMatch =
            level === "" || skill.level === level;

        const typeMatch =
            type === "" || skill.type === type;

        return (
            searchMatch &&
            categoryMatch &&
            levelMatch &&
            typeMatch
        );
    });

    const groupedSkills = [];

    filteredSkills.forEach((skill) => {
        const existingUser = groupedSkills.find(
            (user) => user.userId === skill.userId
        );

        if (existingUser) {
            existingUser.skills.push(skill);
        } else {
            groupedSkills.push({
                userId: skill.userId,
                userName: skill.userName,
                skills: [skill]
            });
        }
    });

    const handleRequestSwap = (skill) => {
        setSelectedSkill(skill);
        setSelectedOfferedSkill("");
        setMessage("");
    };

    const handleCloseRequest = () => {
        setSelectedSkill(null);
        setSelectedOfferedSkill("");
        setMessage("");
    };

    const handleSubmitRequest = async (e) => {
        e.preventDefault();

        if (!selectedOfferedSkill || !message.trim()) {
            return;
        }

        try {
            await createSwapRequest(user.id, {
                receiverId: selectedSkill.userId,
                skillOfferedId: Number(selectedOfferedSkill),
                skillWantedId: selectedSkill.skillId,
                message: message.trim()
            });

            alert("Swap request sent successfully");
            handleCloseRequest();
        } catch (error) {
            console.error(error);
            alert("Send swap request failed");
        }
    };

    return (
        <div className="discover-page">

            <div className="discover-header">
                <h2>Discover Skills</h2>

                <p>
                    Find people with skills you want to learn and
                    connect for a swap.
                </p>
            </div>

            <div className="filter-bar-card">

                <div className="discover-search">
                    <input
                        type="text"
                        placeholder="Search by skill, name, or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="discover-filters">

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">
                            All Categories
                        </option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">
                            All Levels
                        </option>

                        {levels.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">
                            All Types
                        </option>

                        {types.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            <SkillList
                users={groupedSkills}
                onRequestSwap={handleRequestSwap}
            />

            <div className="pagination">

                <button
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 0}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={
                        currentPage + 1 >= totalPages
                    }
                >
                    Next
                </button>

            </div>

            {selectedSkill && (
                <div className="request-modal-overlay">

                    <div className="request-modal">

                        <h3>Request Skill Swap</h3>

                        <p>
                            Requesting{" "}
                            <strong>
                                {selectedSkill.skillName}
                            </strong>{" "}
                            from{" "}
                            <strong>
                                {selectedSkill.userName}
                            </strong>
                        </p>

                        <form onSubmit={handleSubmitRequest}>

                            <label>Your Skill</label>

                            <select
                                value={selectedOfferedSkill}
                                onChange={(e) =>
                                    setSelectedOfferedSkill(
                                        e.target.value
                                    )
                                }
                                required
                            >
                                <option value="">
                                    Select a skill you can offer
                                </option>

                                {mySkills.map((skill) => (
                                    <option
                                        key={skill.id}
                                        value={skill.skillId}
                                    >
                                        {skill.skillName}
                                    </option>
                                ))}
                            </select>

                            <label>Message</label>

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                placeholder="Write a message..."
                                required
                            />

                            <div className="request-modal-actions">

                                <button
                                    type="button"
                                    onClick={handleCloseRequest}
                                >
                                    Cancel
                                </button>

                                <button type="submit">
                                    Send Request
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default DiscoverSkills;
