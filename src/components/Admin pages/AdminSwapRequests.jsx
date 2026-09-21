
import { useEffect, useState } from "react";
import "../../App.css";
import { getAllSwapRequest } from "../../services/swapRequestService";

function AdminSwapRequests() {
    const [swapRequests, setSwapRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    const getRequests = async () => {
        try {
            const res = await getAllSwapRequest(currentPage, size);
            setSwapRequests(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRequests();
    }, [currentPage, size])

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Swap Requests</h2>
             
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
                        {swapRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.senderName}</td>
                                <td>{request.receiverName}</td>
                                <td>{request.skillOfferedName}</td>
                                <td>{request.skillWantedName}</td>
                                
                                <td>
                                    <span className={`admin-status ${request.swapStatus.toLowerCase()}`}>
                                        {request.swapStatus}
                                    </span>
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

export default AdminSwapRequests;

