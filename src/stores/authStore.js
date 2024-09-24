import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    user: null,
  }),
  actions: {
    login(accessToken, refreshToken) {
      this.setTokens(accessToken, refreshToken);
    },
    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    clearTokens() {
      this.accessToken = "";
      this.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    logout() {
      this.clearTokens();
      this.user = null;
    },
    setUser(data) {
      this.user = data;
    },
    setRefreshToken(data) {
      const { access } = data;
      this.setTokens(access);
    },
  },
});
