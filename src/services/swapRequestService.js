import api from "./api";

export const createSwapRequest = async (senderId, data) => {
    const response = await api.post(
        `/swaprequests/${senderId}`,
        data
    );
    return response.data;
};

export const getReceivedRequests = async (userId) => {
    const response = await api.get(`/swaprequests/received/${userId}`);
    return response.data;
};

export const getSentRequests = async (userId) => {
    const response = await api.get(`/swaprequests/sent/${userId}`);
    return response.data;
};

export const acceptSwapRequest = async (swapId, userId) => {
    const response = await api.put(`/swaprequests/${swapId}/accept/${userId}`);
    return response.data;
};

export const rejectSwapRequest = async (swapId, userId) => {
    const response = await api.put(`/swaprequests/${swapId}/reject/${userId}`);
    return response.data;
};

export const cancelSwapRequest = async (swapId, userId) => {
    const response = await api.put(`/swaprequests/${swapId}/cancel/${userId}`);
    return response.data;
};