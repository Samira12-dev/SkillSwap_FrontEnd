
import { useEffect, useState } from "react";
import { MdSearch, MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import "../../App.css";
import { getAllUsers } from "../../services/userService";

function AdminUsers() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10)
    const getUsers = async () => {
        try {
            const res = await getAllUsers(currentPage, size);
            setUsers(res.data.content);
            setTotalPages(res.data.totalPages);;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [currentPage,size]);

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Users</h2>
                <p>Manage users registered on the platform.</p>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Users</h3>

                    <div className="admin-search">
                        <MdSearch />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>
                                    <span className={`admin-role ${user.role.toLowerCase()}`}>
                                        {user.role}
                                    </span>
                                </td>
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
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage + 1 >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AdminUsers;

