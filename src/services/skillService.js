

import api from "./api";

export const getUserSkills = async (userId, page, size) => {
    const response = await api.get(`/skills/users/${userId}/skills?page=${page}&size=${size}`);
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

export const updateUserSkill = async (userId, skillId, data) => {
    const response = await api.put(
        `/skills/users/${userId}/skills/${skillId}`,
        data
    );
    return response.data;
};

export const removeSkillFromUser = async (userId, skillId) => {
    const response = await api.delete(
        `/skills/users/${userId}/skills/${skillId}`
    );
    return response.data;
};

export const getDiscoverSkills = async (page = 0, size = 12) => {
    const response = await api.get(
        `/skills/discover?page=${page}&size=${size}`
    );

    return response.data;
};

export const getUserProfileSkills = async (userId) => {
    const response = await api.get(`/skills/users/${userId}/profile-skills`);
    return response.data;
};


export const getAllSkillsToAdmin = async (page, size) => {
    return api.get("/skills/admin/details", {
        params: { page, size }
    });
};


    