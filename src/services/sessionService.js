
import api from "./api";

export const getMySessions = async (userId) => {
    const response = await api.get(`/sessions/my?userId=${userId}`);
    return response.data;
};

