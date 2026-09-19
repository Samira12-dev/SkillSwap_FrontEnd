import api from "./api";

export const createSwapRequest = async (senderId, data) => {
    const response = await api.post(
        `/swaprequests/${senderId}`,
        data
    );
    return response.data;
};


export const getReceivedRequests = async (userId, page = 0, size = 10) => {
    const response = await api.get(
        `/swaprequests/received/${userId}?page=${page}&size=${size}`
    );
    return response.data;
};

export const getSentRequests = async (userId, page = 0, size = 10) => {
    const response = await api.get(
        `/swaprequests/sent/${userId}?page=${page}&size=${size}`
    );
    return response.data;
};

export const acceptSwapRequest = async (swapId, userId) => {
    const response = await api.put(
        `/swaprequests/${swapId}/accept/${userId}`
    );
    return response.data;
};

export const rejectSwapRequest = async (swapId, userId) => {
    const response = await api.put(
        `/swaprequests/${swapId}/reject/${userId}`
    );
    return response.data;
};

export const cancelSwapRequest = async (swapId, userId) => {
    const response = await api.put(
        `/swaprequests/${swapId}/cancel/${userId}`
    );
    return response.data;
};

export const completeSwapRequest = async (swapId, userId) => {
    const response = await api.put(
        `/swaprequests/${swapId}/complete/${userId}`
    );
    return response.data;
};