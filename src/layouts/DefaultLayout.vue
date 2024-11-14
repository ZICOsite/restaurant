<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/navbar/Navbar.vue";
import { ref, onMounted } from "vue";
const preloader = ref(true);

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

  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>
