
import { useState } from "react";
import { MdSearch, MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import "../../App.css";

function AdminSkills() {
    const [search, setSearch] = useState("");

    const skills = [
        {
            id: 1,
            name: "Java",
            category: "Programming",
            level: "ADVANCED",
            user: "Adam Smith"
        },
        {
            id: 2,
            name: "React",
            category: "Programming",
            level: "INTERMEDIATE",
            user: "Sara Ali"
        },
        {
            id: 3,
            name: "English",
            category: "Languages",
            level: "BEGINNER",
            user: "John Doe"
        }
    ];

    const filteredSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase()) ||
        skill.user.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Skills</h2>
                <p>Manage skills available on the platform.</p>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Skills</h3>

                    <div className="admin-search">
                        <MdSearch />
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Category</th>
                            <th>Level</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSkills.map((skill) => (
                            <tr key={skill.id}>
                                <td>{skill.name}</td>
                                <td>{skill.category}</td>
                                <td>{skill.level}</td>
                                <td>{skill.user}</td>
                                <td>
                                    <div className="admin-actions-small">
                                        <button>
                                            <MdVisibility />
                                        </button>
                                        <button>
                                            <MdEdit />
                                        </button>
                                        <button>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminSkills;

