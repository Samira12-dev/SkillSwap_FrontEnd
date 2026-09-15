import { Bell } from "lucide-react";
import NotificationCard from "./NotificationCard";
import "../../App.css";

function NotificationList({ notifications, onRead }) {
    if (!notifications || notifications.length === 0) {
        return (
            <div className="notification-empty">
                <Bell size={40} />

                <h3>No notifications</h3>

                <p>
                    You don't have any notifications yet.
                </p>
            </div>
        );
    }

    return (
        <div className="notifications-list">
            {notifications.map((notification) => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onRead={onRead}
                />
            ))}
        </div>
    );
}

export default NotificationList;