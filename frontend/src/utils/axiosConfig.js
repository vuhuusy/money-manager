import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const PUBLIC_ENDPOINTS = ["/login", "/register", "/status", "/activate", "/health"];

const isPublicEndpoint = (url = "") =>
    PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

const axiosConfig = axios.create({ baseURL: BASE_URL });

axiosConfig.interceptors.request.use((config) => {
    if (!isPublicEndpoint(config.url)) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }
    return config;
});

axiosConfig.interceptors.response.use(null, (error) => {
    if (error.response?.status === 401 && !isPublicEndpoint(error.config?.url)) {
        window.location.href = "/login";
    } else if (error.response?.status === 500) {
        console.error("Server error:", error.response.data);
    } else if (error.code === "ECONNABORTED") {
        console.error("Request timeout:", error.message);
    }
    return Promise.reject(error);
});

export default axiosConfig;
