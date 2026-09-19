
import { MdNotifications } from "react-icons/md";
import "../../App.css";

function AdminNotifications() {
    const notifications = [
        {
            id: 1,
            title: "New user registered",
            message: "Adam Smith joined SkillSwap.",
            date: "Today"
        },
        {
            id: 2,
            title: "New swap request",
            message: "Sara sent a new skill swap request.",
            date: "Today"
        },
        {
            id: 3,
            title: "New session",
            message: "A new session has been scheduled.",
            date: "Yesterday"
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Notifications</h2>
                <p>View platform notifications.</p>
            </div>

            <div className="admin-notifications">
                {notifications.map((notification) => (
                    <div
                        className="admin-notification"
                        key={notification.id}
                    >
                        <div className="admin-notification-icon">
                            <MdNotifications />
                        </div>

                        <div>
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span>{notification.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminNotifications;

