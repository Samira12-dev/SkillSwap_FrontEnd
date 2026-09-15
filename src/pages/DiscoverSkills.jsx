import { useState } from "react";
import SkillList from "../components/skills/SkillList";
import "../App.css";

function DiscoverSkills() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");

    const skills = [
        {
            id: 1,
            user: "Aisha Patel",
            city: "Seattle, WA",
            avatar: "https://i.pravatar.cc/100?img=5",
            rating: 5,
            reviews: 27,
            sessions: 22,
            bio: "Certified yoga instructor and wellness coach. I believe in balancing tech with mindful living.",
            offering: [
                {
                    name: "Yoga",
                    level: "Advanced"
                },
                {
                    name: "Meditation",
                    level: "Advanced"
                },
                {
                    name: "Nutrition Planning",
                    level: "Intermediate"
                }
            ],
            wanted: ["React", "Web Development"]
        },
        {
            id: 2,
            user: "Sarah Chen",
            city: "New York, NY",
            avatar: "https://i.pravatar.cc/100?img=12",
            rating: 4.9,
            reviews: 23,
            sessions: 18,
            bio: "UX designer and amateur photographer. Looking to sharpen my coding skills.",
            offering: [
                {
                    name: "UI/UX Design",
                    level: "Advanced"
                },
                {
                    name: "Photography",
                    level: "Advanced"
                },
                {
                    name: "Figma",
                    level: "Advanced"
                }
            ],
            wanted: ["Frontend", "JavaScript"]
        },
        {
            id: 3,
            user: "Lucas Moreau",
            city: "Miami, FL",
            avatar: "https://i.pravatar.cc/100?img=3",
            rating: 4.9,
            reviews: 16,
            sessions: 13,
            bio: "Chef and culinary instructor with Michelin experience.",
            offering: [
                {
                    name: "French Cooking",
                    level: "Advanced"
                },
                {
                    name: "Pastry & Baking",
                    level: "Advanced"
                },
                {
                    name: "Wine Pairing",
                    level: "Intermediate"
                }
            ],
            wanted: ["Spanish", "Digital Marketing"]
        }
    ];

    const handleRequestSwap = (skill) => {
        console.log("Request swap:", skill);
    };

    const filteredSkills = skills.filter((skill) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
            skill.user.toLowerCase().includes(searchValue) ||
            skill.city.toLowerCase().includes(searchValue) ||
            skill.offering.some((item) =>
                item.name.toLowerCase().includes(searchValue)
            );

        const matchesLevel =
            !level ||
            skill.offering.some((item) => item.level === level);

        return matchesSearch && matchesLevel;
    });

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
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search by name, skill, or city..."
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
                        <option value="Technology">Technology</option>
                        <option value="Design">Design</option>
                        <option value="Language">Languages</option>
                        <option value="Health">Health & Wellness</option>
                        <option value="Cooking">Culinary</option>
                    </select>

                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="OFFER">Offering</option>
                        <option value="WANTED">Wants to Learn</option>
                    </select>

                </div>
            </div>

            <SkillList
                skills={filteredSkills}
                onRequestSwap={handleRequestSwap}
            />

        </div>
    );
}

export default DiscoverSkills;