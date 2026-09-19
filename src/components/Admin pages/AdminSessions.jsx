
import "../../App.css";

function AdminSessions() {
    const sessions = [
        {
            id: 1,
            user1: "Adam Smith",
            user2: "Sara Ali",
            date: "20/09/2026",
            mode: "ONLINE",
            status: "CONFIRMED"
        },
        {
            id: 2,
            user1: "John Doe",
            user2: "Adam Smith",
            date: "22/09/2026",
            mode: "ONLINE",
            status: "PROPOSED"
        },
        {
            id: 3,
            user1: "Sara Ali",
            user2: "John Doe",
            date: "25/09/2026",
            mode: "OFFLINE",
            status: "COMPLETED"
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Sessions</h2>
                <p>Monitor skill exchange sessions.</p>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Sessions</h3>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User 1</th>
                            <th>User 2</th>
                            <th>Date</th>
                            <th>Mode</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessions.map((session) => (
                            <tr key={session.id}>
                                <td>{session.user1}</td>
                                <td>{session.user2}</td>
                                <td>{session.date}</td>
                                <td>{session.mode}</td>
                                <td>
                                    <span className="admin-status">
                                        {session.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminSessions;

