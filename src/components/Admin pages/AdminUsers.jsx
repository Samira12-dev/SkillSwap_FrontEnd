
import { useEffect, useState } from "react";
import {
    MdSearch,
    MdVisibility,
    MdDelete,
    MdClose
} from "react-icons/md";
import "../../App.css";
import { getAllUsers, getUserById, deleteUser } from "../../services/userService";

function AdminUsers() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size] = useState(10);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showView, setShowView] = useState(false);

    const getUsers = async () => {
        try {
            const res = await getAllUsers(currentPage, size);
            setUsers(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [currentPage, size]);

    const filteredUsers = users.filter((user) =>
        user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );


    const handleView = async (userId) => {
        try {
            const user = await getUserById(userId);

            setSelectedUser(user);
            setShowView(true);

        } catch (error) {
            console.log("VIEW USER ERROR:", error);
        }
    };


    const closeView = () => {
        setShowView(false);
        setSelectedUser(null);
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(userId);
            getUsers();
        } catch (error) {
            window.alert(error.response?.data || "Failed to delete user");
        }
    };

    return (
        <div className="admin-page">

            <div className="admin-header">
                <h2>Users</h2>
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
                                    <span
                                        className={`admin-role ${user.role?.toLowerCase()}`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>

                                    <div className="admin-actions-small">

                                        <button
                                            onClick={() => handleView(user.id)}
                                            title="View"
                                        >
                                            <MdVisibility />
                                        </button>

                                        <button
                                            disabled={user.role === "ADMIN"}
                                            title="Delete"
                                            onClick={() => handleDelete(user.id)}
                                        >
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

            {showView && selectedUser && (

                <div className="admin-modal-overlay">

                    <div className="admin-modal">

                        <div className="admin-modal-header">

                            <h3>User Details</h3>

                            <button onClick={closeView}>
                                <MdClose />
                            </button>

                        </div>

                        <div className="admin-user-details">

                            <p>
                                <strong>First name:</strong>{" "}
                                {selectedUser.firstName}
                            </p>

                            <p>
                                <strong>Last name:</strong>{" "}
                                {selectedUser.lastName}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedUser.email}
                            </p>

                            <p>
                                <strong>City:</strong>{" "}
                                {selectedUser.city}
                            </p>

                            <p>
                                <strong>Role:</strong>{" "}
                                {selectedUser.role}
                            </p>

                            <p>
                                <strong>Bio:</strong>{" "}
                                {selectedUser.bio || "No bio"}
                            </p>

                            <p>
                                <strong>Rating:</strong>{" "}
                                {selectedUser.rating ?? "No rating"}
                            </p>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminUsers;

