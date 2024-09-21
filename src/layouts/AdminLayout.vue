<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
</script>

<template>
  <div class="admin">
    <Sidebar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
