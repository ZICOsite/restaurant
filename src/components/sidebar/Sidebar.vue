<script setup>
import { RouterLink, useRouter } from "vue-router";
import {
  IconDashboard,
  IconEvents,
  IconHistoryBooking,
  IconSettings,
  IconLogIn,
} from "@/helpers/icones";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/" class="sidebar__logo">
      <img src="@/assets/images/logo.svg" alt="" />
    </RouterLink>
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <RouterLink to="/admin" class="sidebar__link">
          <IconDashboard />
          Дашборд
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink to="/admin/menu" class="sidebar__link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-utensils-icon lucide-utensils"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
          Меню
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink to="/admin/history" class="sidebar__link">
          <IconEvents />
          История броней
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink to="/admin/events" class="sidebar__link">
          <IconHistoryBooking />
          Мероприятия
        </RouterLink>
      </li>
      <li class="sidebar__item">
        <RouterLink to="/admin/settings" class="sidebar__link">
          <IconSettings />
          Настройки
        </RouterLink>
      </li>
    </ul>
    <span class="sidebar__logout" @click="logout">
      <IconLogIn color="#000" :size="24" />
      Выйти из аккаунта
    </span>
  </aside>
</template>
