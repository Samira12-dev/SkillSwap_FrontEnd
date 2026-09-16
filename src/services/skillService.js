

import api from "./api";

export const getUserSkills = async (userId) => {
    const response = await api.get(`/skills/users/${userId}/skills`);
    return response.data;
};

export const getAllSkills = async () => {
    const response = await api.get("/skills");
    return response.data;
};

export const addSkillToUser = async (userId, data) => {
    const response = await api.post(
        `/skills/users/${userId}/skill`,
        data
    );
    return response.data;
};

export const getDiscoverSkills = async (page = 0, size = 12) => {
    const response = await api.get(
        `/skills/discover?page=${page}&size=${size}`
    );

    return response.data;
};