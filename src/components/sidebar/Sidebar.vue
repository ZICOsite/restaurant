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
