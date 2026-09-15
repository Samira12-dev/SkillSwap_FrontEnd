import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let navigate;

export const setupNavigate = (nav) => {
    navigate = nav;
};

api.interceptors.response.use(
    async (response) => {
        return response;
    },

    async (error) => {
        if (error.response) {

            switch (error.response.status) {

                case 401:
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    if (navigate) {
                        navigate("/login");
                    }
                    break;

                case 403:
                    console.log(
                        "403 Forbidden on:",
                        error.config?.method?.toUpperCase(),
                        error.config?.url
                    );

                    if (navigate) {
                        navigate("/access-denied");
                    }
                    break;

                case 404:
                    console.log("Resource not found");

                    if (navigate) {
                        navigate("/not-found");
                    }
                    break;

                case 500:
                    console.log("Internal server error");
                    break;

                default:
                    console.log("Unexpected error");
            }

        } else {
            console.log("Network error or no response from server");
        }

        throw error;
    }
);

export default api;