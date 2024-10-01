<script setup>
import {
  IconLogIn,
  IconPersonSearch,
  IconMenu,
} from "@/helpers/icones";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { onMounted, ref } from "vue";
import { useSwipeSceneStore } from "@/stores/swipeSceneStore";

const authStore = useAuthStore();
const swipeSceneStore = useSwipeSceneStore()
const scene = ref(false)

const toast = useToast();

const show = () => {
  toast.add({
    severity: "secondary",
    summary: "Поиск",
    detail: "Нажмите комбинацию CTRL + F",
    life: 3000,
  });
};

const changeScene = () => {
  scene.value = !scene.value
  swipeSceneStore.changeScene(scene.value ? 1 : 0)
}

onMounted(() => {
  calendar.addEventListener("click", () => restaurantDate.classList.toggle("active"))
})

</script>

<template>
  <nav class="nav">
    <div class="nav__container">
      <RouterLink to="/" class="nav__logo">
        <img src="@/assets/images/logo.svg" alt="Bier Regen logo" width="80" />
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
  </nav>
  <nav class="nav-mobile">
    <ul class="nav-mobile__list">
      <li class="nav-mobile__item" id="calendar">
        <i style="color: #000; font-size: 1.3rem" class="pi pi-calendar"></i>
      </li>
      <li class="nav-mobile__item" @click="changeScene">
        <i
          style="color: #000; font-size: 1.3rem"
          class="pi pi-arrow-right-arrow-left"
        ></i>
      </li>
      <li class="nav-mobile__logo">
        <img src="@/assets/images/logo.svg" alt="" width="90" />
      </li>
      <li class="nav-mobile__item">
        <a href="/bierregen-menu.pdf" target="_blank">
          <i
            style="color: #000; font-size: 1.3rem"
            class="pi pi-list-check"
          ></i>
        </a>
      </li>
      <li class="nav-mobile__item">
        <a href="tel:+998991080808">
          <i style="color: #000; font-size: 1.3rem" class="pi pi-phone"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>
