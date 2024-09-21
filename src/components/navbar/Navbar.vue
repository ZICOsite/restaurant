<script setup>
import {
  IconPhone,
  IconLogIn,
  IconPersonSearch,
  IconMenu,
} from "@/helpers/icones";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const authStore = useAuthStore();

const toast = useToast();

const show = () => {
  toast.add({
    severity: "secondary",
    summary: "Поиск",
    detail: "Нажмите комбинацию CTRL + F",
    life: 3000,
  });
};
</script>

<template>
  <div class="nav">
    <div class="nav__container">
      <RouterLink to="/" class="nav__logo">
        <img src="/logo.svg" alt="" />
      </RouterLink>
      <ul class="nav__list">
        <li class="nav__item">
          <Button
            as="a"
            label="Меню"
            href="/bierregen-menu.pdf"
            rel="noopener"
            class="nav__list-menu"
            target="_blank"
          >
            Меню <IconMenu />
          </Button>
        </li>
        <li class="nav__item">
          <a href="tel:+998991080808" class="nav__link">+998 99-108-08-08</a>
        </li>
        <li class="nav__item nav__item_phone">
          <a href="tel:+998991080808" class="nav__icon">
            <IconPhone color="#fff" />
          </a>
        </li>
        <li
          class="nav__item nav__item_search"
          v-if="authStore.accessToken"
          @click="show()"
        >
          <IconPersonSearch color="#fff" />
        </li>
        <li
          class="nav__item nav__item_logout"
          v-if="authStore.accessToken"
          @click="authStore.logout()"
        >
          <IconLogIn color="#fff" />
        </li>
      </ul>
    </div>
    <Toast position="top-center" />
  </div>
</template>
