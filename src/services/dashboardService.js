
import api from "./api";

export const getUserDashboard = async (userId) => {
    const response = await api.get(`/dashboard/user/${userId}`);
    return response.data;
};
