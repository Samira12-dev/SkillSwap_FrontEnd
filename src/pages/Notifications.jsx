import { Bell } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import NotificationList from "../components/notifications/NotificationList";
import { AuthContext } from "../context/AuthContext";
import {
    getNotificationsByUser,
    markNotificationAsRead
} from "../services/notificationService";
import "../App.css";

function Notifications() {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        getNotificationsByUser(user.id)
            .then((data) => {
                const list = (data.content || []).map((notification) => ({
                    ...notification,
                    createdAt: notification.createdAt
                        ? new Date(notification.createdAt).toLocaleString()
                        : ""
                }));

                setNotifications(list);
            })
            .catch((error) => {
                console.error("NOTIFICATIONS ERROR:", error);
            });
    }, [user]);

    const handleRead = async (id) => {
        try {
            await markNotificationAsRead(id, user.id);

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("MARK AS READ ERROR:", error);
        }
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
