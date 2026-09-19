import api from "./api";

export const getMyConversations = async (userId) => {
    const response = await api.get(`/conversations/my/${userId}`);
    return response.data;
};

export const getConversationById = async (conversationId, userId) => {
    const response = await api.get(
        `/conversations/${conversationId}/user/${userId}`
    );
    return response.data;
};