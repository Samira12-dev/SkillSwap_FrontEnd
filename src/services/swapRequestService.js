import api from "./api";

export const getReceivedRequests = async (userId) => {
    const response = await api.get(`/swaprequests/received/${userId}`);
    return response.data;
};
