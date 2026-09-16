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
    const [sort, setSort] = useState("");

    useEffect(() => {
        getDiscoverSkills()
            .then((data) => {
                const result = [];

                data.forEach((user) => {
                    user.offering.forEach((skill) => {
                        result.push({
                            ...skill,
                            userId: user.id,
                            userName: user.user,
                            city: user.city,
                            avatar: user.avatar,
                            rating: user.rating,
                            type: "OFFER"
                        });
                    });

                    user.wanted.forEach((skill) => {
                        result.push({
                            ...skill,
                            userId: user.id,
                            userName: user.user,
                            city: user.city,
                            avatar: user.avatar,
                            rating: user.rating,
                            type: "WANTED"
                        });
                    });
                });

                setSkills(result);
            })
            .catch((error) => {
                console.error( error);
            });
    }, []);

    const categories = [
        ...new Set(skills.map((skill) => skill.category))
    ];

    const levels = [
        ...new Set(skills.map((skill) => skill.level))
    ];

    const types = [
        ...new Set(skills.map((skill) => skill.type))
    ];

    const filteredSkills = skills
        .filter((skill) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                skill.name?.toLowerCase().includes(searchValue) ||
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
        })
       

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
                onRequestSwap={() => {}}
            />
        </div>
    );
}

export default DiscoverSkills;