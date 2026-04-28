import axios from "axios";
import { clearCurrentUser, getAuthToken, isTokenExpired } from "../utils/auth";

const API = axios.create({
  baseURL: "https://backend-repo-production-f790.up.railway.app/api", // ✅ FIXED
});

// 🔐 Add token automatically to every request
API.interceptors.request.use((req) => {
  const token = getAuthToken();

  if (!token || isTokenExpired(token)) {
    clearCurrentUser();
    delete req.headers.Authorization;
    return req;
  }

  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }

  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      clearCurrentUser();

      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.assign("/");
      }
    }

    return Promise.reject(error);
  }
);

export default API;
