
import { useEffect, useState } from "react";
import "../../App.css";
import { getAllSessions } from "../../services/sessionService";

function AdminSessions() {

    const [sessions, setSessions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size] = useState(10);

    const getSessions = async () => {
        try {
            const res = await getAllSessions(currentPage, size);

            setSessions(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSessions();
    }, [currentPage, size]);

    return (
        <div className="admin-page">

            <div className="admin-header">
                <h2>Sessions</h2>
            </div>

            <div className="admin-table-card">

                <div className="admin-table-header">
                    <h3>All Sessions</h3>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Mode</th>
                            <th>Status</th>
                            <th>Conversation</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessions.map((session) => (
                            <tr key={session.id}>
                                <td>{session.date}</td>
                                <td>{session.duration} min</td>
                                <td>{session.mode}</td>
                                <td>
                                    <span
                                        className={`admin-status ${session.status.toLowerCase()}`}
                                    >
                                        {session.status}
                                    </span>
                                </td>
                                <td>{session.conversationId}</td>
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

export default AdminSessions;

