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
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      api
        .get("refresh")
        .then(function (response) {
          localStorage.setItem("access", response.data);
        })
        .catch(function (error) {
          window.location.href = MAIN_URL;
        });
    }
    return Promise.reject(error);
  }
);

export default api;
