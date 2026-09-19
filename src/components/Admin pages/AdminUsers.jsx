
import { useState } from "react";
import { MdSearch, MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import "../../App.css";

function AdminUsers() {
    const [search, setSearch] = useState("");

    const users = [
        {
            id: 1,
            name: "Adam Smith",
            email: "adam@gmail.com",
            role: "USER",
            city: "Beni Mellal"
        },
        {
            id: 2,
            name: "Sara Ali",
            email: "sara@gmail.com",
            role: "USER",
            city: "Marrakech"
        },
        {
            id: 3,
            name: "Admin User",
            email: "admin@gmail.com",
            role: "ADMIN",
            city: "Casablanca"
        }
    ];

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
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
        </div>
    );
}

export default AdminUsers;

