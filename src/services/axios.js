import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { postApi } from "./api";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore();

    // Если есть accessToken и запрос не является повторным
    if (authStore.accessToken && !config._retry) {
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
    const originalRequest = error.config;
    const authStore = useAuthStore();
    // Проверяем статус ошибки 401 (истек токен)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Если есть refreshToken, пытаемся обновить токен
        if (authStore.refreshToken) {
          const { data } = await postApi.postRefreshToken(
            "authentication/token/refresh/",
            authStore.refreshToken
          );

          // Обновляем access-токен в сторе и повторяем исходный запрос
          authStore.setAccessToken(data.access);
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

          return axiosInstance(originalRequest);
        } else {
          // Если нет refresh токена, перенаправляем на логин
          authStore.clearTokens(); // Очищаем токены
          // router.push("/login");
        }
      } catch (refreshError) {
        // Если обновить токен не удалось, очищаем данные и перенаправляем на логин
        authStore.clearTokens();
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Возвращаем ошибку, если это не 401
  }
);

export { axiosInstance };
