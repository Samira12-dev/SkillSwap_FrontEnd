import api from "./api";

export const createReview = async (reviewerId, data) => {
    const response = await api.post(`/reviews/${reviewerId}`, data);
    return response.data;
};

export const getReviewsByUser = async (userId, page = 0, size = 10) => {
    const response = await api.get(
        `/reviews/user/${userId}?page=${page}&size=${size}`
    );
    return response.data;
};

export const getAverageRating = async (userId) => {
    const response = await api.get(`/reviews/user/${userId}/average`);
    return response.data;
};
