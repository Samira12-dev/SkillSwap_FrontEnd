import api from "./api";

export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateProfile = async (userId, data) => {
    const response = await api.put(`/users/${userId}`, data);
    return response.data;
};

export const getAllUsers = (page, size) => {
return api.get("/users", {
    params: { page, size }
});
};
