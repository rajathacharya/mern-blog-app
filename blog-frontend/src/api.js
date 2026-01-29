// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  withCredentials: true, // allows sending/receiving cookies
});

// Automatically attach access token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// If access token expires, attempt refresh
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.get("http://localhost:5000/api/auth/refresh", {
          withCredentials: true,
        });
        const newToken = res.data.token;
        localStorage.setItem("token", newToken);
        API.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
