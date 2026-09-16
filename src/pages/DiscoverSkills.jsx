import { useEffect, useState } from "react";
import SkillList from "../components/skills/SkillList";
import { getDiscoverSkills } from "../services/skillService";
import "../App.css";

function DiscoverSkills() {
    const [skills, setSkills] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


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
console.log("Selected level:", level);
console.log("All skills:", skills);
console.log("Filtered skills:", filteredSkills);
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
                onRequestSwap={() => { }}
            />
            <div className="pagination">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages - 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default DiscoverSkills;