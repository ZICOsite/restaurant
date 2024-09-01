<script setup>
import RestaurantView from "@/views/restaurant/RestaurantView.vue";
import { onMounted, ref } from "vue";

const showEvent = ref(false);

onMounted(() => {
  setTimeout(() => {
    showEvent.value = true;
  }, 10000);
});
</script>

<template>
  <main>
    <RestaurantView />
    <div class="_event" @click="showEvent = false" v-show="showEvent">
      <div class="_event__content">
        <img src="@/assets/images/events/1.png" alt="event" class="_event__content-img" />
        <a href="https://t.me/BierRegenPub" class="_event__content-btn" target="_blank"
          >Купить билеты</a
        >
      </div>
    </div>
  </main>
</template>
