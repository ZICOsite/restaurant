<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/navbar/Navbar.vue";
import { ref, onMounted } from "vue";
const preloader = ref(true);
const board = ref(true);

onMounted(() => {
  setTimeout(() => {
    preloader.value = false;
  }, 2000);
});
</script>

<template>
  <div class="preloader" v-if="preloader">
    <img src="/logo-fav.svg" alt="" />
  </div>
  <div class="board" v-if="board">
    <div>
      <img src="@/assets/images/floor1/First-Floor-Front.webp" alt="" />
      <Button
        as="router-link"
        to="/"
        label="Бронирование"
        severity="contrast"
        @click="board = false"
      />
    </div>
    <div>
      <img src="@/assets/images/1.jpg" alt="" />
      <Button
        as="router-link"
        label="Мероприятия"
        to="/events"
        severity="contrast"
        @click="board = false"
      />
    </div>
    <div>
      <img src="@/assets/images/menu.jpg" alt="" />
      <Button
        as="a"
        label="Меню"
        href="/bierregen-menu.pdf"
        rel="noopener"
        severity="contrast"
      />
    </div>
  </div>
  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>
