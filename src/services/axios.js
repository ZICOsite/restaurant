import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
