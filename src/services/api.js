import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredBaseUrl
    ? configuredBaseUrl.replace(/\/+$/, "")
    : "/api";

const api = axios.create({
    baseURL
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        if (config.headers && config.headers["Content-Type"]) {
            delete config.headers["Content-Type"];
        }
        if (config.headers && config.headers["content-type"]) {
            delete config.headers["content-type"];
        }
        return config;
    }

    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
        config.headers["Content-Type"] = "application/json";
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
            const requestUrl = error.config?.url || "";
            const isAuthRequest = requestUrl.startsWith("/auth/");

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

                    if (!isAuthRequest && navigate) {
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