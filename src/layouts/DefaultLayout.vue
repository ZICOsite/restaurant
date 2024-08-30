<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <div class="wrapper">
    <Navbar />
    <RouterView />
  </div>
</template>
