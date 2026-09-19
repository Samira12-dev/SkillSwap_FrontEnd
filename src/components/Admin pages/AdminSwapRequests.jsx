
import "../../App.css";

function AdminSwapRequests() {
    const requests = [
        {
            id: 1,
            sender: "Adam Smith",
            receiver: "Sara Ali",
            offered: "Java",
            wanted: "React",
            status: "PENDING"
        },
        {
            id: 2,
            sender: "John Doe",
            receiver: "Adam Smith",
            offered: "English",
            wanted: "Java",
            status: "ACCEPTED"
        },
        {
            id: 3,
            sender: "Sara Ali",
            receiver: "John Doe",
            offered: "React",
            wanted: "English",
            status: "COMPLETED"
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Swap Requests</h2>
                <p>Monitor skill exchange requests.</p>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>All Requests</h3>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Offered Skill</th>
                            <th>Wanted Skill</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.sender}</td>
                                <td>{request.receiver}</td>
                                <td>{request.offered}</td>
                                <td>{request.wanted}</td>
                                <td>
                                    <span className="admin-status">
                                        {request.status}
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

export default AdminSwapRequests;

