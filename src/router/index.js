import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAuthStore } from "@/stores/authStore";
import { jwtDecode } from "jwt-decode";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "public",
      component: DefaultLayout,
      redirect: "/home",
      children: [
        {
          path: "/",
          alias: ["/home"],
          name: "home",
          component: HomePage,
        },
        {
          path: "events",
          name: "events",
          component: () => import("@/pages/EventsPage.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: {
        authAdmin: true,
      },
      children: [
        {
          path: "",
          name: "adminPage",
          component: () => import("@/pages/AdminPage.vue"),
          meta: {
            authAdmin: true,
          },
        },
        {
          path: "history",
          name: "history",
          component: () => import("@/pages/HistoryPage.vue"),
          meta: {
            authAdmin: true,
          },
        },
        {
          path: "settings",
          name: "settings",
          component: () => import("@/pages/SettingsPage.vue"),
          meta: {
            authAdmin: true,
          },
        },
        {
          path: "events",
          name: "createEvents",
          component: () => import("@/pages/CreateEventsPage.vue"),
          meta: {
            authAdmin: true,
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
      meta: {
        authAdmin: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Проверяем наличие токена
  if (authStore.accessToken) {
    let decodedToken;

    try {
      // Декодируем токен
      decodedToken = jwtDecode(authStore.accessToken);
    } catch (error) {
      // Если токен невалиден или истек
      console.error("Invalid token:", error);
      authStore.logout();
      return next("/login"); // Прекращаем выполнение и перенаправляем на страницу входа
    }

    // Проверяем, если требуется админская роль
    if (to.meta.authAdmin && !decodedToken.is_superuser) {
      return next("/login"); // Если пользователь не админ, перенаправляем на вход
    }
  } else if (to.meta.authAdmin) {
    // Если требуется авторизация, но токена нет
    return next("/login");
  }

  // Если все проверки пройдены, разрешаем переход
  next();
});

export default router;
