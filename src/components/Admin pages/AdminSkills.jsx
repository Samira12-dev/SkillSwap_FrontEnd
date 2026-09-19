
import { useEffect, useState } from "react";
import { MdSearch, MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import "../../App.css";
import { getAllSkillsToAdmin } from "../../services/skillService";

function AdminSkills() {
    const [search, setSearch] = useState("");
    const [skills, setSkills] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10)



    const getSkills = async () => {
        try {
            const res = await getAllSkillsToAdmin(currentPage, size);

            setSkills(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSkills();
    }, [currentPage, size])


    const filteredSkills = skills.filter((skill) =>
        skill.skillName?.toLowerCase().includes(search.toLowerCase()) ||
        skill.category?.toLowerCase().includes(search.toLowerCase()) ||
        skill.userName?.toLowerCase().includes(search.toLowerCase())
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
                            <th>Type</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSkills.map((skill) => (
                            <tr key={skill.id}>
                                <td>{skill.skillName}</td>
                                <td>{skill.category}</td>
                                <td>{skill.level}</td>
                                <td>{skill.type}</td>
                                <td>{skill.userName}</td>

                                <td>
                                    <div className="admin-actions-small">
                                        <button><MdVisibility /></button>
                                        <button><MdEdit /></button>
                                        <button><MdDelete /></button>
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

