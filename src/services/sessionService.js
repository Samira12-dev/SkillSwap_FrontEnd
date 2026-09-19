import api from "./api";

export const getMySessions = async (userId) => {
    const response = await api.get(`/sessions/my?userId=${userId}`);
    return response.data;
};

export const createSession = async (data, userId) => {
    const response = await api.post(`/sessions?userId=${userId}`, data);
    return response.data;
};

export const acceptSession = async (sessionId, userId) => {
    const response = await api.put(`/sessions/${sessionId}/accept/user/${userId}`);
    return response.data;
};

export const cancelSession = async (sessionId, userId) => {
    const response = await api.put(`/sessions/${sessionId}/cancel/user/${userId}`);
    return response.data;
};

export const completeSession = async (sessionId, userId) => {
    const response = await api.put(`/sessions/${sessionId}/complete/${userId}`);
    return response.data;
};
export const getSessionById = async (sessionId) => {
    const response = await api.get(`/sessions/${sessionId}`);
    return response.data;
};