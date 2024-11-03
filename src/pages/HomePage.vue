<script setup>
import { IconClose } from "@/helpers/icones";
import { eventApi } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import RestaurantView from "@/views/restaurant/RestaurantView.vue";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const showEvent = ref(false);
const events = ref(null);

const getEvents = async () => {
  try {
    const { data } = await eventApi.getEvents("authentication/events/");
    events.value = data;
    console.log(data);
  } catch (error) {
    console.error("Error", error);
  }
};

onMounted(() => {
  setTimeout(() => {
    showEvent.value = true;
    getEvents();
  }, 10000);
});
</script>

<template>
  <main>
    <RestaurantView />
    <div
      class="_event"
      @click="showEvent = false"
      v-show="showEvent && !authStore.accessToken"
    >
      <div class="_event__content" @click.stop>
        <span class="_event__content-close" @click="showEvent = false">
          <IconClose />
        </span>
        <img :src="events?.[0].image" alt="event" class="_event__content-img" />
        <a
          href="https://t.me/BierRegenPub"
          class="_event__content-btn"
          target="_blank"
        >
          Купить билеты
        </a>
      </div>
    </div>
  </main>
</template>
