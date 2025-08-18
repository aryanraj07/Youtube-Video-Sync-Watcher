// axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1", // your backend URL
  withCredentials: true, // ✅ important so cookies get sent
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired & we haven’t retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        await api.post("/auth/refresh-token");

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Please login again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
