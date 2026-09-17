import api from "./api";

export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};
