
import api from "./api";

export const register = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const getUser = () => {
    try {
        const user = localStorage.getItem("user");

        if (!user || user === "undefined" || user === "null") {
            return null;
        }

        return JSON.parse(user);
    } catch (error) {
        return null;
    }
};