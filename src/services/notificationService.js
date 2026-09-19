import api from "./api";

export const getNotificationsByUser = async (userId, page = 0, size = 10) => {
    const response = await api.get(
        `/notifications/user/${userId}?page=${page}&size=${size}`
    );
    return response.data;
};

export const markNotificationAsRead = async (notificationId, userId) => {
    const response = await api.put(
        `/notifications/${notificationId}/read?userId=${userId}`
    );
    return response.data;
};

export const getUnreadNotificationCount = async (userId) => {
    const response = await api.get(
        `/notifications/user/${userId}/unread-count`
    );
    return response.data;
};
