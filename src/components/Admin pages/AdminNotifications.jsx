import { useEffect, useState } from "react";
import {
    MdNotifications,
    MdPersonAdd,
    MdSwapHoriz,
    MdCheckCircle,
    MdCalendarToday,
    MdStar
} from "react-icons/md";
import "../../App.css";
import { getAllNotifications } from "../../services/notificationService";

function AdminNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size] = useState(10);

    const getNotifications = async () => {
        try {
            const res = await getAllNotifications(currentPage, size);

            setNotifications(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getNotifications();
    }, [currentPage, size]);

    const getIcon = (type) => {
        switch (type) {
            case "NEW_USER":
                return <MdPersonAdd />;

            case "NEW_SWAP_REQUEST":
                return <MdSwapHoriz />;

            case "SWAP_ACCEPTED":
                return <MdCheckCircle />;

            case "NEW_SESSION":
                return <MdCalendarToday />;

            case "SESSION_COMPLETED":
                return <MdCheckCircle />;

            case "NEW_REVIEW":
                return <MdStar />;

            default:
                return <MdNotifications />;
        }
    };

    return (
        <div className="admin-page">

            <div className="admin-header">
                <h2>Notifications</h2>
                <p>View platform activity and important alerts.</p>
            </div>

            <div className="admin-notifications">

                {notifications.length === 0 ? (
                    <div className="admin-empty">
                        <MdNotifications />
                        <p>No notifications found.</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            className={`admin-notification ${
                                notification.isRead ? "" : "unread"
                            }`}
                            key={notification.id}
                        >

                            <div className="admin-notification-icon">
                                {getIcon(notification.type)}
                            </div>

                            <div className="admin-notification-content">

                                <h4>
                                    {notification.type
                                        ?.replaceAll("_", " ")
                                        .toLowerCase()
                                        .replace(/\b\w/g, (letter) =>
                                            letter.toUpperCase()
                                        )}
                                </h4>

                                <p>{notification.message}</p>

                                <span>
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}
                                </span>

                            </div>

                        </div>
                    ))
                )}

            </div>

            {totalPages > 0 && (
                <div className="pagination">

                    <button
                        onClick={() =>
                            setCurrentPage(currentPage - 1)
                        }
                        disabled={currentPage === 0}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage(currentPage + 1)
                        }
                        disabled={
                            currentPage + 1 >= totalPages
                        }
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
}

export default AdminNotifications;

