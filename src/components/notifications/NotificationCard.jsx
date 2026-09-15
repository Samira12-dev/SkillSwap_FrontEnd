import { Bell, Check } from "lucide-react";
import "../../App.css";

function NotificationCard({ notification, onRead }) {
    return (
        <div
            className={`notification-card ${
                notification.isRead ? "read" : "unread"
            }`}
        >
            <div className="notification-icon">
                <Bell size={20} />
            </div>

            <div className="notification-content">
                <p>{notification.message}</p>
                <span>{notification.createdAt}</span>
            </div>

            {!notification.isRead && (
                <button
                    className="notification-read-btn"
                    onClick={() => onRead(notification.id)}
                >
                    <Check size={17} />
                    Mark as read
                </button>
            )}
        </div>
    );
}

export default NotificationCard;