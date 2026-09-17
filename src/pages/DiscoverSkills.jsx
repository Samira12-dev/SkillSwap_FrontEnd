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

    useEffect(() => {
        getDiscoverSkills(currentPage, 12)
            .then((data) => {
                setSkills(data.content);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error("DISCOVER ERROR:", error);
            });
    }, [currentPage]);

    useEffect(() => {
        if (!user) {
            return;
        }

        getUserSkills(user.id)
            .then((data) => {
                const offeredSkills = (data.content || []).filter(
                    (skill) => skill.type === "OFFER"
                );

                setMySkills(offeredSkills);
            })
            .catch((error) => {
                console.error("MY SKILLS ERROR:", error);
            });
    }, [user]);

    const categories = [
        ...new Set(skills.map((skill) => skill.category))
    ];

    const levels = [
        ...new Set(skills.map((skill) => skill.level))
    ];

    const types = [
        ...new Set(skills.map((skill) => skill.type))
    ];

    const filteredSkills = skills.filter((skill) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            skill.skillName?.toLowerCase().includes(searchValue) ||
            skill.userName?.toLowerCase().includes(searchValue) ||
            skill.category?.toLowerCase().includes(searchValue);

        const matchesCategory =
            !category || skill.category === category;

        const matchesLevel =
            !level || skill.level === level;

        const matchesType =
            !type || skill.type === type;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesLevel &&
            matchesType
        );
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

        if (!user || !selectedSkill || !selectedOfferedSkill || !message.trim()) {
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
            console.error("REQUEST SWAP ERROR:", error);
            alert("Failed to send swap request");
        }
    };

    return (
        <div className="discover-page">
            <div className="discover-header">
                <h2>Discover Skills</h2>

                <p>
                    Find people with skills you want to learn and connect
                    for a swap.
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
                        <option value="">All Categories</option>

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
                        <option value="">All Levels</option>

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
                        <option value="">All Types</option>

                        {types.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <SkillList
                skills={filteredSkills}
                onRequestSwap={handleRequestSwap}
            />

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage + 1 >= totalPages}
                >
                    Next
                </button>
            </div>

            {selectedSkill && (
                <div className="request-modal-overlay">
                    <div className="request-modal">
                        <h3>Request Skill Swap</h3>

                        <p>
                            Requesting <strong>{selectedSkill.skillName}</strong>{" "}
                            from <strong>{selectedSkill.userName}</strong>
                        </p>

                        <form onSubmit={handleSubmitRequest}>
                            <label>Your Skill</label>

                            <select
                                value={selectedOfferedSkill}
                                onChange={(e) =>
                                    setSelectedOfferedSkill(e.target.value)
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
                                onChange={(e) => setMessage(e.target.value)}
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