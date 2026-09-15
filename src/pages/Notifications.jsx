import { Bell } from "lucide-react";
import NotificationList from "../components/notifications/NotificationList";
import "../App.css";

function Notifications() {
    const notifications = [
        {
            id: 1,
            type: "NEW_SWAP_REQUEST",
            message: "Ahmed sent you a new swap request",
            isRead: false,
            createdAt: "10 minutes ago"
        },
        {
            id: 2,
            type: "REQUEST_ACCEPTED",
            message: "Sara accepted your swap request",
            isRead: true,
            createdAt: "2 hours ago"
        },
        {
            id: 3,
            type: "NEW_MESSAGE",
            message: "Youssef sent you a new message",
            isRead: false,
            createdAt: "Yesterday"
        }
    ];

    const handleRead = (id) => {
        console.log("Mark as read:", id);
    };

    return (
        <div className="notifications-page">

            <div className="notifications-header">

                <div>
                    <h2>Notifications</h2>

                    <p>
                        Stay updated with your SkillSwap activity.
                    </p>
                </div>

                <div className="notifications-title-icon">
                    <Bell size={24} />
                </div>

            </div>

            <NotificationList
                notifications={notifications}
                onRead={handleRead}
            />

        </div>
    );
}

export default Notifications;