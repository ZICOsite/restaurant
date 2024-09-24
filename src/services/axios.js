import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { postApi } from "./api";
import router from '@/router';

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    if (error.response.status === 401) {
      const { data } = await postApi.postRefreshToken(
        "authentication/token/refresh/",
        authStore.refreshToken
      );
      authStore.setRefreshToken(data.access);
      router.push('/login');
    }
  }
);

export { axiosInstance };
