import axios from "axios";

const JWTToken = localStorage.getItem("access");
export const MAIN_URL = "http://localhost:3000/login";
export const API_URL = "http://localhost:3001/api/";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export function apiSetHeader(name, value) {
    if (value) {
        api.defaults.headers[name] = value;
    }
}

if (JWTToken) {
    apiSetHeader("Auth", `${JWTToken}`);
}
api.interceptors.response.use(
    (response) => {
        if (!response.config.headers["Auth"]) {
            window.location.href = MAIN_URL;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            localStorage.clear();
            const res = await api.post("refresh");
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access_token);
                apiSetHeader("Auth", `${localStorage.getItem("access")}`);
                originalRequest.headers.Auth = localStorage.getItem("access");
                return api.request(originalRequest);
            } else {
                window.location.href = MAIN_URL;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
