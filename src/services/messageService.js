import api from "./api";

export const getMessagesByConversation = async (conversationId, userId) => {
    const response = await api.get(
        `/messages/conversation/${conversationId}?userId=${userId}&page=0&size=50`
    );
    return response.data;
};

export const markMessageAsRead = async (messageId, userId) => {
    const response = await api.put(
        `/messages/${messageId}/read?userId=${userId}`
    );
    return response.data;
};