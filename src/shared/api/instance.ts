import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Could redirect to login or clear auth state
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth")) {
        // Optional: redirect to auth
      }
    }
    return Promise.reject(error);
  }
);
