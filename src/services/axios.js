import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { postApi } from "./api";
import router from "@/router"; // Импорт маршрутизатора

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
    if (error.response?.status === 401) {
      try {
        const { data } = await postApi.postRefreshToken(
          "authentication/token/refresh/",
          authStore.refreshToken
        );
        authStore.setAccessToken(data.access);
        
        // Повторить исходный запрос с обновлённым токеном
        error.config.headers["Authorization"] = `Bearer ${data.access}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        // Очистить данные авторизации и перенаправить на страницу логина
        authStore.logout();
        router.push("/login");
      }
    }

    return Promise.reject(error); // Прокинуть ошибку дальше, если она другая
  }
);

export { axiosInstance };
