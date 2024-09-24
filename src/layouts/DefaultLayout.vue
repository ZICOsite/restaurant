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
      <Button
        as="a"
        label="Меню"
        href="/bierregen-menu.pdf"
        rel="noopener"
        severity="contrast"
      />
    </div>
    <div>
      <Button
        label="Забронировать столик"
        severity="contrast"
        @click="board = false"
      />
    </div>
  </div>
  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>
