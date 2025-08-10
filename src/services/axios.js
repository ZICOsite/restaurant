import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { postApi } from "./api";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
  },
});

// Отдельный axios без интерсепторов для refresh
const rawAxios = axios.create({
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
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    const originalRequest = error.config;

    // Проверка: статус 401, не повторяемый запрос, и есть refreshToken
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authStore.refreshToken
    ) {
      originalRequest._retry = true; // пометка, что уже пробовали

      try {
        // Запрос на обновление токена без интерсепторов
        const { data } = await postApi.postRefreshToken(
          "authentication/token/refresh/",
          authStore.refreshToken
        );

        // Сохранить новый access token
        authStore.setAccessToken(data.access);

        // Повторить исходный запрос с новым токеном
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Не удалось обновить токен — выйти и перенаправить
        authStore.logout();
        router.push("/login");
      }
    }

    return Promise.reject(error); // Прокинуть ошибку дальше
  }
);

export { axiosInstance, rawAxios };
